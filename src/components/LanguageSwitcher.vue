<template>
  <div class="language-switcher">
    <label for="language-select"
      ><strong>{{ translateStore.getTranslation('language') }}: </strong></label
    >
    <select
      id="language-select"
      v-model="selectedLanguage"
      @change="updateLanguage"
    >
      <option
        v-for="lang in translateStore.languages"
        :key="lang.code"
        :value="lang.code"
      >
        {{ lang.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useTranslateStore } from '@/stores/translate';

  const translateStore = useTranslateStore();
  const selectedLanguage = ref(translateStore.currentLanguage);

  watch(
    () => translateStore.currentLanguage,
    (newLang) => {
      selectedLanguage.value = newLang;
    }
  );

  function updateLanguage() {
    translateStore.setLanguage(selectedLanguage.value);
  }
</script>

<style scoped>
  .language-switcher select {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    color: #333;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    transition:
      background-color 0.3s,
      border-color 0.3s;
  }

  .language-switcher select:hover {
    background-color: #e6e6e6;
    border-color: #007bff;
  }

  .language-switcher select:focus {
    border-color: #0056b3;
    box-shadow: 0 0 5px rgba(38, 143, 255, 0.5);
  }

  .language-switcher select::-ms-expand {
    display: none;
  }

  .language-switcher select::after {
    content: '';
    color: #333;
    font-size: 0.9rem;
  }

  .language-switcher option {
    padding: 0.5rem 1rem;
  }
</style>
