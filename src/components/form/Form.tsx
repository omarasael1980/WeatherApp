import { useEffect, useState, FormEvent } from "react";
import { countries } from "../../data/countries.js";
import type { SearchType, Alert } from "../../types/index.ts";

type FormProps = {
  fetchWeather: (search: SearchType) => void;
};

export default function Form({ fetchWeather }: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    country: "",
    city: "",
  });
  const [error, setError] = useState<Alert>({
    error: false,
    msg: "",
    title: "",
  });

  useEffect(() => {
    if (error.msg) {
      setTimeout(() => {
        setError({
          error: false,
          msg: "",
          title: "",
        });
      }, 2000);
    }
  }, [error]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.country === "" || search.city === "") {
      setError({
        error: true,
        msg: "Todos los campos son obligatorios",
        title: "Error",
      });
    } else {
      fetchWeather(search);
    }
  };

  return (
    <form
      className="bg-white rounded-lg opacity-90 shadow-md w-3/4 p-4"
      onSubmit={handleSubmit}
    >
      <div className="h-16">
        {error.error && (
          <div className="bg-red-500 w-full rounded-sm mb-4 p-4">
            <span className="text-white font-bold text-2xl text-center">
              <p className="text-center">{error.msg}</p>
            </span>
          </div>
        )}
      </div>
      <h1 className="text-4xl font-extrabold text-center mb-4 text-blue-900">
        Búsqueda del clima
      </h1>
      <div className="flex items-center mb-4 justify-between">
        <label className="text-2xl font-bold mr-4 w-1/4" htmlFor="country">
          País:
        </label>
        <select
          onChange={(e) => setSearch({ ...search, country: e.target.value })}
          value={search.country}
          className="text-black border text-2xl p-2 flex-1 uppercase"
          name="country"
          id="country"
        >
          <option className="text-black" key="0" value="">
            Selecciona un país
          </option>
          {countries.map((country) => (
            <option
              className="text-black"
              key={country.code}
              value={country.code}
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center mb-4 justify-between">
        <label className="text-2xl font-bold mr-4 w-1/4" htmlFor="city">
          Ciudad:
        </label>
        <input
          onChange={(e) => setSearch({ ...search, city: e.target.value })}
          value={search.city}
          className="pl-4 border text-2xl p-2 flex-1 uppercase"
          id="city"
          name="city"
          type="text"
          placeholder="Mexicali..."
          autoComplete="off"
        />
      </div>
      <button
        type="submit" // Cambia el tipo del botón a "submit"
        className="border bg-blue-900 hover:bg-blue-400 text-white w-full p-3 rounded text-2xl font-bold"
      >
        Buscar
      </button>
    </form>
  );
}
