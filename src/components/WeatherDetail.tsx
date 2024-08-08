import { WeatherType } from "../types";
import { formatTemperature } from "../utils";

type WeatherDetailProps = {
  weather: WeatherType; // Corrección: cambiar "weater" a "weather"
};

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div className="bg-white w-3/4 p-4 rounded-md opacity-90 flex flex-col justify-center items-center mt-6">
      <h1 className="text-5xl font-bold text-blue-900 mb-4">
        <span className="font-extrabold text-blue-900">{weather.name}</span>
      </h1>
      <p className="text-3xl mb-6 text-center font-bold text-blue-900">
        {formatTemperature(weather.main.temp)} &deg;C
      </p>
      <div>
        <p className="text-xl text-center font-bold">
          Temperatura mínima: {formatTemperature(weather.main.temp_min)} &deg;C
        </p>
        <p className="text-xl text-center font-bold">
          Temperatura máxima: {formatTemperature(weather.main.temp_max)} &deg;C
        </p>
        <p className="text-xl text-center font-bold mb-2">
          Sensación térmica: {formatTemperature(weather.main.feels_like)} &deg;C
        </p>
      </div>
    </div>
  );
}
