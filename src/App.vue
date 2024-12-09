<template>
  <div class="weather-app">
    <div class="weather-container-section">
      <WeatherCard
        :weatherData="weatherData"
        :selectedCity="selectedCity"
        :currentWeatherIcon="currentWeatherIcon"
        :formattedDate="formattedDate"
        :sunrise="sunrise"
        :sunset="sunset"
      />
      <div class="weather-right-section">
        <div class="search-section">
          <SearchInput
            :onCitySelect="selectCity"
            :onAddToFavorites="addToFavorites"
          />
          <LanguageSwitcher />
        </div>
        <ForecastCards :forecast="forecast" />
        <div
          v-if="favoritesCities.length > 0"
          class="swiper-container"
        >
          <WeatherSlider
            ref="weatherSliderRef"
            :cities="favoritesCities"
            @citySelected="updateSelectedCity"
            @removeCity="removeFromFavorites"
          />
        </div>

        <div
          v-else
          class="no-favorites"
        >
          <p>{{ translateStore.getTranslation('noSavedCities') }}</p>
        </div>
      </div>
    </div>
    <div class="chart-container">
      <Chart
        v-if="hourlyTemperatures.length"
        :temperatures="hourlyTemperatures"
        :labels="hourlyLabels"
        :icons="hourlyIcons"
      />
    </div>
    <Modal
      v-if="isModalVisible"
      :visible="isModalVisible"
      :title="modalTitle"
      :message="modalMessage"
      @close="isModalVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import WeatherCard from './components/WeatherCard.vue';
  import LanguageSwitcher from './components/LanguageSwitcher.vue';
  import type { WeatherData } from '@/types/WeatherData';
  import WeatherSlider from './components/WeatherSlider.vue';
  import type { ForecastItem } from '@/types/forecastItem';
  import { useTranslateStore } from './stores/translate';
  import {
    fetchForecast,
    fetchHourlyTemperatures,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  } from './API/api';
  import Chart from './components/Chart.vue';
  import SearchInput from './components/SearchInput.vue';
  import ForecastCards from './components/ForecastCards.vue';
  import Modal from './components/Modal.vue';

  const searchQuery = ref<string>('');
  const weatherData = ref<WeatherData | null>(null);
  const forecast = ref<ForecastItem[]>([]);
  const selectedCity = ref<string>('');
  const userCoords = ref<{ lat: number; lon: number } | null>(null);
  const hourlyTemperatures = ref<number[]>([]);
  const hourlyLabels = ref<string[]>([]);
  const hourlyIcons = ref<string[]>([]);
  const favoritesCities = ref<
    { name: string; weather: string; temp: number }[]
  >([]);
  const isModalVisible = ref(false);
  const modalTitle = ref('');
  const modalMessage = ref('');

  function showModal(title: string, message: string) {
    modalTitle.value = title;
    modalMessage.value = message;
    isModalVisible.value = true;
  }

  const translateStore = useTranslateStore();

  const MAX_FAVORITES = 5;
  const FAVORITES_STORAGE_KEY = 'favoritesCities';

  const currentWeatherIcon = computed<string>(() =>
    weatherData.value
      ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
      : ''
  );

  const formattedDate = computed<string>(() =>
    new Date().toLocaleDateString(translateStore.currentLanguage, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  const sunrise = computed<string>(() =>
    weatherData.value
      ? new Date(weatherData.value.sys.sunrise * 1000).toLocaleTimeString(
          translateStore.currentLanguage,
          { hour: '2-digit', minute: '2-digit' }
        )
      : ''
  );

  const sunset = computed<string>(() =>
    weatherData.value
      ? new Date(weatherData.value.sys.sunset * 1000).toLocaleTimeString(
          translateStore.currentLanguage,
          { hour: '2-digit', minute: '2-digit' }
        )
      : ''
  );

  function addToFavorites(): void {
    if (weatherData.value) {
      const newFavorite = {
        name: selectedCity.value,
        weather: weatherData.value.weather[0].description,
        temp: Math.round(weatherData.value.main.temp),
        icon: `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`,
      };

      if (
        favoritesCities.value.some((city) => city.name === newFavorite.name)
      ) {
        showModal(
          String(translateStore.getTranslation('error')),
          String(translateStore.getTranslation('cityAlreadyInFavorites'))
        );
        return;
      }

      if (favoritesCities.value.length >= MAX_FAVORITES) {
        showModal(
          String(translateStore.getTranslation('error')),
          String(translateStore.getTranslation('maxFavoritesReached'))
        );
        return;
      }

      favoritesCities.value.push(newFavorite);
      saveFavoritesToLocalStorage();
      showModal(
        String(translateStore.getTranslation('success')),
        String(translateStore.getTranslation('cityAddedToFavorites'))
      );
    }
  }

  function removeFromFavorites(cityName: string): void {
    favoritesCities.value = favoritesCities.value.filter(
      (city) => city.name !== cityName
    );

    saveFavoritesToLocalStorage();
  }

  function saveFavoritesToLocalStorage(): void {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favoritesCities.value)
    );
  }

  function loadFavoritesFromLocalStorage(): void {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (savedFavorites) {
      try {
        favoritesCities.value = JSON.parse(savedFavorites);
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
      }
    }
  }

  async function getUserLocation(): Promise<void> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          userCoords.value = { lat: latitude, lon: longitude };
          await updateWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
          alert(
            'Could not retrieve location. Please enable location services.'
          );
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  async function updateWeatherByCoords(
    lat: number,
    lon: number
  ): Promise<void> {
    try {
      const weather = await fetchWeatherByCoords(
        lat,
        lon,
        translateStore.currentLanguage
      );
      weatherData.value = weather;
      selectedCity.value = `${weather.name}, ${weather.sys.country}`;
      forecast.value = await fetchForecast(
        lat,
        lon,
        translateStore.currentLanguage
      );
      const hourlyData = await fetchHourlyTemperatures(
        lat,
        lon,
        translateStore.currentLanguage
      );
      hourlyTemperatures.value = hourlyData.temperatures;
      hourlyLabels.value = hourlyData.labels;
      hourlyIcons.value = hourlyData.icons;
    } catch (error) {
      console.error('Error updating weather by coordinates:', error);
    }
  }

  async function updateWeatherByCity(city: string): Promise<void> {
    try {
      const weather = await fetchWeatherByCity(
        city,
        translateStore.currentLanguage
      );
      weatherData.value = weather;
      selectedCity.value = `${weather.name}, ${weather.sys.country}`;
      forecast.value = await fetchForecast(
        weather.coord.lat,
        weather.coord.lon,
        translateStore.currentLanguage
      );
      const hourlyData = await fetchHourlyTemperatures(
        weather.coord.lat,
        weather.coord.lon,
        translateStore.currentLanguage
      );
      hourlyTemperatures.value = hourlyData.temperatures;
      hourlyLabels.value = hourlyData.labels;
      hourlyIcons.value = hourlyData.icons;
    } catch (error) {
      console.error('Error updating weather by city:', error);
    }
  }

  function selectCity(city: string): void {
    searchQuery.value = city;
    updateWeatherByCity(city);
  }

  function updateSelectedCity(city: {
    name: string;
    weather: string;
    temp: number;
  }) {
    updateWeatherByCity(city.name);
  }

  onMounted(() => {
    loadFavoritesFromLocalStorage();
    getUserLocation();
  });

  watch(translateStore, async () => {
    if (weatherData.value) {
      await updateWeatherByCoords(
        weatherData.value.coord.lat,
        weatherData.value.coord.lon
      );
    }
  });
</script>

<style scoped>
  .weather-app {
    font-family: Arial, sans-serif;
    background-color: #f0f4f8;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border-radius: 8px;
  }

  .weather-container-section {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .weather-right-section {
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .search-section {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;
  }

  .chart-container {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .no-favorites {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.4rem;
    color: #555;
    margin-top: 3.5rem;
  }
</style>
