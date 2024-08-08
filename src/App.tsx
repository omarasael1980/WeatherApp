import { useEffect, useState } from "react";
import Form from "./components/form/Form";
import useWeather from "./hooks/useWeather";
import WeatherDetail from "./components/WeatherDetail";
import Loading from "./components/Loading";

const patterns = [
  "bg-rumo-pattern",
  "bg-ensenada-pattern",
  "bg-tijuana-pattern",
];

function App() {
  const [backgroundClass, setBackgroundClass] = useState(patterns[0]);
  const { fetchWeather, weather, hasWeatherData, loading, alert } =
    useWeather();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundClass((prevClass) => {
        const currentIndex = patterns.indexOf(prevClass);
        const nextIndex = (currentIndex + 1) % patterns.length;
        return patterns[nextIndex];
      });
    }, 40000);

    return () => clearInterval(intervalId);
  }, []);
  // console.log(loading);
  //console.log(alert);

  return (
    <div
      className={`h-screen ${backgroundClass} bg-cover bg-center transition-background flex flex-col justify-center items-center`}
    >
      <div className="flex flex-col w-full justify-center items-center">
        <h1 className="text-6xl font-extrabold text-center text-blue-900 mb-8">
          Weather App
        </h1>
        <div className="w-3/4  m-auto lg:grid lg:grid-cols-2 lg:items-center lg:gap-4 lg:mt-10 items-baseline">
          <Form fetchWeather={fetchWeather} />
          {loading && <Loading />}
          {alert.error ? (
            <p className="w-full bg-red-800 text-white text-2xl text-center rounded-md p-2 text-bold uppercase">
              {alert.msg}
            </p>
          ) : (
            <div>{hasWeatherData && <WeatherDetail weather={weather} />}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
