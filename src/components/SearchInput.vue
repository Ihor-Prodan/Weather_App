<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      @input="fetchCitySuggestions(searchQuery)"
      :placeholder="translateStore.getTranslation('enterCity') as string"
      class="search-input"
    />
    <ul
      v-if="suggestions.length"
      class="autocomplete-list"
    >
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectCity(suggestion)"
        class="autocomplete-item"
      >
        {{ suggestion }}
      </li>
    </ul>
    <button
      @click="onAddToFavorites"
      class="add-button"
    >
      {{ translateStore.getTranslation('addCity') }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useTranslateStore } from '@/stores/translate';
  import axios from 'axios';
  import type { CitySuggestion } from '@/types/citySuggestion';
  import { API_KEY } from '@/API/api';

  const props = defineProps<{
    onCitySelect: (city: string) => void;
    onAddToFavorites: () => void;
  }>();

  const searchQuery = ref<string>('');
  const suggestions = ref<string[]>([]);
  const translateStore = useTranslateStore();

  async function fetchCitySuggestions(query: string): Promise<void> {
    if (!query) {
      suggestions.value = [];
      return;
    }

    try {
      const response = await axios.get<CitySuggestion[]>(
        `https://api.openweathermap.org/geo/1.0/direct`,
        {
          params: {
            q: query,
            limit: 5,
            appid: API_KEY,
          },
        }
      );

      const uniqueSuggestions = Array.from(
        new Set(response.data.map((item) => item.name))
      );

      suggestions.value = uniqueSuggestions;
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      suggestions.value = [];
    }
  }

  function selectCity(city: string): void {
    searchQuery.value = city;
    suggestions.value = [];

    props.onCitySelect(city);
  }
</script>

<style scoped lang="css">
  .search-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .search-input {
    max-width: 250px;
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .autocomplete-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    top: 40px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: white;
    max-height: 150px;
    overflow-y: auto;
    position: absolute;
    width: 250px;
    z-index: 10;
  }

  .autocomplete-item {
    padding: 8px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
  }

  .autocomplete-item:hover {
    background: #e6e6e6;
  }

  .add-button {
    padding: 0.5rem 1rem;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  .add-button:hover {
    background-color: #357abd;
  }
</style>
