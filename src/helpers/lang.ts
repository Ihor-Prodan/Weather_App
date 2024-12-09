export interface TranslationProperties {
  [key: string]: string;
  temperature: string;
  description: string;
  humidity: string;
  windSpeed: string;
  precipitation: string;
  sunrise: string;
  sunset: string;
}

interface Translation {
  id: string;
  properties: TranslationProperties;
}

type Translations = Record<string, Translation>;

export const translations: Translations = {
  en: {
    id: 'en',
    properties: {
      temperature: 'Temperature',
      description: 'Description',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      precipitation: 'Precipitation',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      time: 'Time',
      temperatureWithUnit: 'Temperature (°C)',
      savedCities: 'Saved Cities',
      addCity: 'Add City',
      noSavedCities: 'No saved cities added yet!',
      language: 'Language',
      enterCity: 'Enter city...',
      cityAlreadyInFavorites: 'City is already in favorites!',
      maxFavoritesReached: 'You can add up to 5 favorite cities only!',
      cityAddedToFavorites: 'City is added to favorites!',
      success: 'Success',
      error: 'Error',
    },
  },
  uk: {
    id: 'ua',
    properties: {
      temperature: 'Температура',
      description: 'Опис',
      humidity: 'Вологість',
      windSpeed: 'Швидкість вітру',
      precipitation: 'Опади',
      sunrise: 'Схід сонця',
      sunset: 'Захід сонця',
      time: 'Час',
      temperatureWithUnit: 'Температура (°C)',
      savedCities: 'Збережені міста',
      addCity: 'Додати місто',
      noSavedCities: 'Ще не додано жодного збереженого міста!',
      language: 'Мова',
      enterCity: 'Введіть місто...',
      cityAlreadyInFavorites: 'Місто вже є у вибраному!',
      maxFavoritesReached: 'Можна додати не більше 5 міст у вибране!',
      cityAddedToFavorites: 'Місто додано у вибране!',
      success: 'Успіх',
      error: 'Помилка',
    },
  },
  sk: {
    id: 'sk',
    properties: {
      temperature: 'Teplota',
      description: 'Popis',
      humidity: 'Vlhkosť',
      windSpeed: 'Rýchlosť vetra',
      precipitation: 'Zrážky',
      sunrise: 'Východ slnka',
      sunset: 'Západ slnka',
      time: 'Čas',
      temperatureWithUnit: 'Teplota (°C)',
      savedCities: 'Uložené mestá',
      addCity: 'Pridať mesto',
      noSavedCities: 'Ešte neboli pridané žiadne uložené mestá!',
      language: 'Jazyk',
      enterCity: 'Zadajte mesto...',
      cityAlreadyInFavorites: 'Mesto už je v obľúbených!',
      maxFavoritesReached: 'Môžete pridať maximálne 5 obľúbených miest!',
      cityAddedToFavorites: 'Mesto bolo pridané do obľúbených!',
      success: 'Úspech',
      error: 'Chyba',
    },
  },
  de: {
    id: 'de',
    properties: {
      temperature: 'Temperatur',
      description: 'Beschreibung',
      humidity: 'Luftfeuchtigkeit',
      windSpeed: 'Windgeschwindigkeit',
      precipitation: 'Niederschlag',
      sunrise: 'Sonnenaufgang',
      sunset: 'Sonnenuntergang',
      time: 'Zeit',
      temperatureWithUnit: 'Temperatur (°C)',
      savedCities: 'Gespeicherte Städte',
      addCity: 'Stadt hinzufügen',
      noSavedCities: 'Noch keine gespeicherten Städte hinzugefügt!',
      language: 'Sprache',
      enterCity: 'Stadt eingeben...',
      cityAlreadyInFavorites: 'Die Stadt ist bereits in den Favoriten!',
      maxFavoritesReached: 'Sie können maximal 5 Favoritenstädte hinzufügen!',
      cityAddedToFavorites: 'Die Stadt wurde zu den Favoriten hinzugefügt!',
      success: 'Erfolg',
      error: 'Fehler',
    },
  },
};
