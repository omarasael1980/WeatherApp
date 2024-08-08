import { useState, useMemo, useEffect } from "react";
import type { SearchType, Alert, WeatherType } from "../types";
import { object, string, number, parse } from "valibot";
import axios from "axios";

//1 valibot schema
const weatherSchema = object({
  name: string(),
  main: object({
    temp: number(),
    temp_min: number(),
    temp_max: number(),
    feels_like: number(),
  }),
});

export default function useWeather() {
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<Alert>({
    error: false,
    msg: "",
    title: "",
  });
  const [weather, setWeather] = useState<WeatherType>({
    name: "",
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
      feels_like: 0,
    },
  });
  useEffect(() => {
    if (alert.msg) {
      setTimeout(() => {
        setAlert({});
      }, 2000);
    }
  }, [alert]);
  const fetchWeather = async (search: SearchType) => {
    const key = import.meta.env.VITE_API_KEY;
    try {
      setWeather({
        name: "",
        main: {
          temp: 0,
          temp_min: 0,
          temp_max: 0,
          feels_like: 0,
        },
      });
      setLoading(true);
      const GEO_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${key}`;
      const response = await axios.get(GEO_URL);
      const { lat, lon } = response.data[0];
      if ([lat, lon].includes(undefined)) {
        return {
          msg: `Tuvimos problemas para buscar el clima de ${search.city}, ${search.country}`,
          error: true,
          title: "Error Al buscar el clima",
        };
      } else {
        const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
        const { data: weatherResponse } = await axios.get(weatherAPI);

        //3 pasar a valibot schema
        const weather = parse(weatherSchema, weatherResponse);
        if (weather) {
          setWeather(weather);
          //   console.log("fetchWeather", weather);
        } else {
          console.log("Error en la validación de la respuesta");
        }
      }
      //  console.log(weather);
    } catch (error) {
      setAlert({
        error: true,
        msg: "Tuvimos problemas para encontrar la ciudad solicitada",
        title: "Error Al buscar el clima",
      });
    } finally {
      setLoading(false);
    }
  };
  const hasWeatherData = useMemo(() => weather.name !== "", [weather]);
  return {
    weather,
    fetchWeather,
    hasWeatherData,
    alert,
    loading,
  };
}
