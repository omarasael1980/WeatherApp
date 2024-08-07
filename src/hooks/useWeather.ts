import type { SearchType } from '../types'
import axios from 'axios'
 
const key = import.meta.env.VITE_API_KEY
 
export default function useWeather( ) {
    const fetchWeather = async (search : SearchType) => {
        try {
            
           
          const GEO_URL=`http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${key}`
            const response = await axios.get(GEO_URL)
            const {lat, lon} = response.data[0]
            if([lat, lon].includes(undefined)){
               return {msg:`Tuvimos problemas para buscar el clima de ${search.city}, ${search.country}`, error:true, title:'Error Al buscar el clima'}
            }else{
                const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
                const {data: weatherResponse} = await axios.get(weatherAPI)
                console.log('fetchWeather', weatherResponse)
            }
          
        } catch (error) {
            console.log('fetchWeather', error)
        }
       
    }
    
    return {
        fetchWeather
    }
}