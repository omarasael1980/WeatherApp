export type SearchType = {
  country: string;
  city: string;
};

export type CountryType = {
  code: string;
  name: string;
};

export type Alert = {
  error?: boolean;
  msg?: string;
  title?: string;
};
// useWeather.ts
export type WeatherType = {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
  };
};
