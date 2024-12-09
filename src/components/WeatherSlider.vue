<template>
  <div class="weather-slider">
    <div class="swiper-header">
      <p class="swiper-title">
        {{ translateStore.getTranslation('savedCities') }}
      </p>
      <div class="arrows">
        <div
          class="arrow left"
          @click="slidePrev"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="34"
            height="34"
            fill="currentColor"
          >
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
          </svg>
        </div>

        <div
          class="arrow right"
          @click="slideNext"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="34"
            height="34"
            fill="currentColor"
          >
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </div>
      </div>
    </div>

    <swiper
      :slides-per-view="2"
      :slides-per-group="2"
      :speed="700"
      :space-between="20"
      :breakpoints="{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }"
      @swiper="onSwiperInit"
    >
      <swiper-slide
        v-for="city in cities"
        :key="city.name"
        class="slide"
        @click="handleCityClick(city)"
      >
        <div class="city-card">
          <div class="city-name-container">
            <h3>{{ city.name }}</h3>
            <p>
              <strong
                class="remove"
                @click.stop="emit('removeCity', city.name)"
                >X</strong
              >
            </p>
          </div>
          <p>{{ city.weather }}</p>
          <div class="temp-container">
            <div class="temp">{{ city.temp }}°</div>
            <p class="activeCity">.</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import SwiperCore from 'swiper';
  import { Navigation } from 'swiper/modules';
  import { Pagination } from 'swiper/modules';
  import { ref } from 'vue';
  import 'swiper/swiper-bundle.css';
  import { useTranslateStore } from '@/stores/translate';

  SwiperCore.use([Navigation, Pagination]);

  defineProps<{
    cities: {
      name: string;
      weather: string;
      temp: number;
    }[];
  }>();

  const emit = defineEmits(['citySelected', 'removeCity']);
  const translateStore = useTranslateStore();

  const swiperInstance = ref<SwiperCore | null>(null);

  function onSwiperInit(swiper: SwiperCore) {
    swiperInstance.value = swiper;
  }

  function slideNext() {
    if (swiperInstance.value) {
      swiperInstance.value.slideNext();
    }
  }

  function slidePrev() {
    if (swiperInstance.value) {
      swiperInstance.value.slidePrev();
    }
  }

  function handleCityClick(city: {
    name: string;
    weather: string;
    temp: number;
  }) {
    emit('citySelected', city);
  }
</script>

<style scoped>
  .weather-slider {
    max-width: 800px;
    margin: 0 auto;
  }

  .city-card {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .city-card:hover {
    transform: scale(1.01);
  }

  .city-name-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-items: center;
  }

  .remove {
    top: -15px;
    right: -15px;
    position: absolute;
    display: flex;
    color: red;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    padding: 2px 5px;
    border-radius: 50%;
    border: 2px solid red;
  }

  .remove:hover {
    background-color: red;
    color: white;
  }

  .city-card h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .city-card p {
    font-size: 14px;
    color: #777;
    margin-bottom: 16px;
  }

  .city-card .temp {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .temp-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .activeCity {
    color: green;
    font-size: 50px;
    margin-bottom: 16px;
    margin-left: 5px;
    font-weight: bold;
  }

  .city-card {
    cursor: pointer;
    transition:
      transform 0.3s,
      box-shadow 0.3s;
  }

  .swiper-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .swiper-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .arrows {
    display: flex;
    gap: 1rem;
    padding-bottom: 15px;
    cursor: pointer;
  }
</style>
