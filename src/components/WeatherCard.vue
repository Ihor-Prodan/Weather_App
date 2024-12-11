<template>
  <div
    class="main-weather-card"
    v-if="weatherData"
  >
    <div class="location">
      <h2>{{ selectedCity }}</h2>
      <p>{{ formattedDate }}</p>
    </div>
    <div class="weather-details">
      <div class="current-weather">
        <div class="current-weather-icon">
          <img
            :src="currentWeatherIcon"
            alt="Weather Icon"
          />
        </div>

        <h1>
          <strong>{{ translateStore.getTranslation('temperature') }}:</strong>
          {{ Math.round(weatherData.main.temp) }}°C
        </h1>
      </div>
      <div class="weather-stats">
        <p>
          <strong>{{ translateStore.getTranslation('precipitation') }}:</strong>
          {{ weatherData.rain?.['1h'] || 0 }} mm
        </p>
        <p>
          <strong>{{ translateStore.getTranslation('humidity') }}:</strong>
          {{ weatherData.main.humidity }}%
        </p>
        <p>
          <strong>{{ translateStore.getTranslation('windSpeed') }}:</strong>
          {{ weatherData.wind.speed }}
          {{ translateStore.currentLanguage === 'uk' ? 'м/c' : 'm/s' }}
        </p>
      </div>
    </div>

    <div class="sun-times">
      <p>
        🌅 <strong>{{ translateStore.getTranslation('sunrise') }}:</strong>
        {{ sunrise }}
      </p>
      <p>
        🌇 <strong>{{ translateStore.getTranslation('sunset') }}:</strong>
        {{ sunset }}
      </p>
    </div>
  </div>
  <div
    class="main-weather-card-loader"
    v-else
  >
    <Loader />
  </div>
</template>

<script setup lang="ts">
  import { useTranslateStore } from '@/stores/translate';
  import type { WeatherData } from '@/types/WeatherData';
  import type { PropType } from 'vue';
  import Loader from './Loader.vue';

  const translateStore = useTranslateStore();

  defineProps({
    weatherData: {
      type: Object as PropType<WeatherData | null>,
      required: false,
    },
    selectedCity: {
      type: String,
      required: true,
    },
    currentWeatherIcon: {
      type: String,
      required: true,
    },
    formattedDate: {
      type: String,
      required: true,
    },
    sunrise: {
      type: String,
      required: true,
    },
    sunset: {
      type: String,
      required: true,
    },
  });
</script>

<style scoped>
  .main-weather-card {
    display: flex;
    height: auto;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(to bottom, #4a90e2, #607d8b);
    color: white;
    min-width: 320px;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .main-weather-card-loader {
    display: flex;
    height: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #4a90e2, #607d8b);
    min-width: 320px;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .location {
    text-align: center;
  }

  .location h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  .location p {
    margin: 0;
    font-size: 0.9rem;
    color: #cfd8dc;
  }

  .weather-details {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: left;
    margin-bottom: 40px;
  }

  .current-weather-icon {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .current-weather img {
    min-width: 80px;
    min-height: 80px;
  }

  .current-weather h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  .weather-stats {
    margin-top: 10px;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .sun-times {
    text-align: left;
    font-size: 0.9rem;
  }

  @media (max-width: 720px) {
    .main-weather-card,
    .main-weather-card-loader {
      padding: 15px;
      min-width: 280px;
      border-radius: 12px;
    }

    .location h2 {
      font-size: 1.2rem;
    }

    .location p {
      font-size: 0.8rem;
    }

    .current-weather img {
      min-width: 60px;
      min-height: 60px;
    }

    .current-weather h1 {
      font-size: 1.3rem;
    }

    .weather-details {
      margin-bottom: 20px;
    }

    .weather-stats {
      font-size: 0.8rem;
    }

    .sun-times {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 1250px) and (min-width: 721px) {
    .main-weather-card,
    .main-weather-card-loader {
      padding: 20px;
      min-width: 300px;
      border-radius: 14px;
    }

    .location h2 {
      font-size: 1.4rem;
    }

    .location p {
      font-size: 0.85rem;
    }

    .current-weather img {
      min-width: 70px;
      min-height: 70px;
    }

    .current-weather h1 {
      font-size: 1.4rem;
    }

    .weather-details {
      margin-bottom: 30px;
    }

    .weather-stats {
      font-size: 0.85rem;
    }

    .sun-times {
      font-size: 0.85rem;
    }
  }
</style>
