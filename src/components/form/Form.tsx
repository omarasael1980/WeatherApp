import { useState } from 'react';
import { countries } from '../../data/countries.js';

export default function Form() {
  const [selectedCountry, setSelectedCountry] = useState('0');
  const [error, setError] = useState({});

  const handleSelected = (e) => {
    setError({});
    console.log(e.target.value);
    if (e.target.value === '0') {
      setError({ msg: 'Selecciona un país', title: 'Llena bien el formulario', error: true });
      setTimeout(() => {
        if (error.msg) {
          setError({});
        }
      }, 2000);
    }
    setSelectedCountry(e.target.value);
  };

   const handleSubmit = (e) => {
    e.preventDefault();
     
  
   }

  return (
    <form className="bg-white rounded-md opacity-70 shadow-md w-3/4 p-8">
      {error.error && (<div className="bg-red-500     w-100 rounded-sm mb-4 p-4">
        <span className='text-white font-bold text-2xl text-center '><p className='text-center'>{error.msg && error.msg}</p></span></div>)}
      <h1 className="text-4xl font-extrabold text-center mb-4">Búsqueda del clima</h1>
      <div className="flex items-center mb-4 justify-between" >
        <label className="text-2xl font-bold mr-4 w-1/4" htmlFor="country">País:</label>
        <select
          onChange={handleSelected}
          className="text-black border text-2xl p-2 flex-1  "
          name="country"
          id="country"
        >
          <option className="text-black" key="0" value="0">Selecciona un país</option>
          {countries.map((country) => (
            <option className="text-black" key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center mb-4 justify-between">
        <label className="text-2xl font-bold mr-4 w-1/4" htmlFor="city">Ciudad:</label>
        <input
          className="pl-4 border text-2xl p-2 flex-1  "
          id="city"
          name="city"
          type="text"
          placeholder="Mexicali..."
          autoComplete="off"
        />
      </div>
      <button className='border bg-green-700 hover:bg-green-400 text-white w-full p-3 rounded text-2xl font-bold'>Buscar </button>
    </form>
  );
}
