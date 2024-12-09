import { translations, type TranslationProperties } from '@/helpers/lang';
import { defineStore } from 'pinia';

export const useTranslateStore = defineStore('translate', {
  state: () => ({
    currentLanguage: 'en',
    languages: [
      { code: 'en', label: 'English' },
      { code: 'uk', label: 'Українська' },
      { code: 'sk', label: 'Slovak' },
      { code: 'de', label: 'Deutsch' },
    ],
  }),
  actions: {
    setLanguage(lang: string) {
      if (translations[lang]) {
        this.currentLanguage = lang;
      } else {
        console.warn(`Language "${lang}" is not supported.`);
      }
    },
  },
  getters: {
    getTranslation: (state) => {
      return (key: keyof TranslationProperties) => {
        return translations[state.currentLanguage]?.properties[key] || key;
      };
    },
  },
});
