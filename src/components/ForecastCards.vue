<template>
  <div
    class="forecast-cards"
    v-if="forecast.length"
  >
    <div
      class="forecast-card"
      v-for="day in forecast"
      :key="day.day"
    >
      <p>{{ day.day }}</p>
      <img
        :src="day.icon"
        alt="Weather Icon"
      />
      <p>{{ day.temperature }}°C</p>
    </div>
  </div>
  <div
    class="forecast-cards-loader"
    v-else
  >
    <Loader />
  </div>
</template>

<script setup lang="ts">
  import type { ForecastItem } from '@/types/forecastItem';
  import Loader from './Loader.vue';

  defineProps<{
    forecast: ForecastItem[];
  }>();
</script>

<style lang="css" scoped>
  .forecast-cards {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .forecast-cards-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    height: 100%;
  }

  .forecast-card {
    background-color: white;
    min-width: 120px;
    min-height: 200px;
    border-radius: 60px;
    padding: 10px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1.5rem;
    color: #333;
  }

  .forecast-card img {
    min-width: 60px;
    min-height: 60px;
  }

  .forecast-card p {
    margin: 5px 0;
  }

  @media (max-width: 720px) {
    .forecast-cards {
      flex-direction: column;
      gap: 15px;
    }

    .forecast-card {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      min-width: 100px;
      min-height: 180px;
      padding: 25px;
      font-size: 1.9rem;
      border-radius: 60px;
    }

    .forecast-card img {
      min-width: 80px;
      min-height: 80px;
    }
  }

  @media (max-width: 1250px) and (min-width: 721px) {
    .forecast-cards {
      gap: 15px;
    }

    .forecast-card {
      min-width: 110px;
      min-height: 190px;
      font-size: 1rem;
      border-radius: 60px;
    }

    .forecast-card img {
      min-width: 55px;
      min-height: 55px;
    }
  }
</style>
