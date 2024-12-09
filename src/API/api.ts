import axios from 'axios';
import type { WeatherData } from '@/types/WeatherData';
import type { ForecastItem } from '@/types/forecastItem';
import { addDays, format, isSameDay } from 'date-fns';

export const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number,
  lang: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
          lang,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};

export const fetchWeatherByCity = async (
  cityName: string,
  lang: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: cityName,
          appid: API_KEY,
          units: 'metric',
          lang,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by city name:', error);
    throw error;
  }
};

export const fetchForecast = async (
  lat: number,
  lon: number,
  lang: string
): Promise<ForecastItem[]> => {
  try {
    const response = await axios.get<{
      list: Array<{
        dt: number;
        main: { temp: number };
        weather: Array<{ icon: string }>;
      }>;
    }>('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang,
      },
    });

    const groupedForecasts: Record<
      string,
      Array<{ temp: number; icon: string }>
    > = {};

    response.data.list.forEach((item) => {
      const isoDate = new Date(item.dt * 1000).toISOString().split('T')[0];
      if (!groupedForecasts[isoDate]) {
        groupedForecasts[isoDate] = [];
      }
      groupedForecasts[isoDate].push({
        temp: item.main.temp,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      });
    });

    const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

    const sortedDates = Object.keys(groupedForecasts).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    const nextDayIndex = sortedDates.findIndex((date) =>
      isSameDay(new Date(date), new Date(tomorrow))
    );
    const rearrangedDates =
      nextDayIndex !== -1
        ? sortedDates
            .slice(nextDayIndex)
            .concat(sortedDates.slice(0, nextDayIndex))
        : sortedDates;

    return rearrangedDates.slice(0, 6).map((isoDate) => {
      const data = groupedForecasts[isoDate];
      const averageTemp =
        data.reduce((sum, item) => sum + item.temp, 0) / data.length;

      return {
        day: new Date(isoDate).toLocaleDateString(lang, {
          weekday: 'short',
        }),
        temperature: Math.round(averageTemp),
        icon: data[0].icon,
      };
    });
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};
export const fetchHourlyTemperatures = async (
  lat: number,
  lon: number,
  lang: string
): Promise<{ temperatures: number[]; labels: string[]; icons: string[] }> => {
  try {
    const response = await axios.get<{
      list: Array<{
        dt_txt: string;
        main: { temp: number };
        weather: Array<{ icon: string }>;
      }>;
    }>('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang,
      },
    });

    const hourlyData = response.data.list.slice(0, 9);

    const temperatures = hourlyData.map((item) => item.main.temp);
    const labels = hourlyData.map((item) =>
      new Date(item.dt_txt).toLocaleTimeString(lang, {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
    const icons = hourlyData.map(
      (item) =>
        `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
    );

    return { temperatures, labels, icons };
  } catch (error) {
    console.error('Error fetching hourly temperatures:', error);
    throw error;
  }
};
