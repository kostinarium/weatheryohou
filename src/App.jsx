import { useEffect, useState } from "react";
import axios from "axios";
import Forecast from "./Forecast";
import WeatherChart from "./WeatherChart";

function App() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("Tokyo"); 

    const cities = ["Tokyo", "London", "New York", "Paris", "Moscow"]; 

    const fetchWeather = async (city) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
            );
            setWeather(response.data);
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            setWeather(null); 
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, [city]); // Перезапрашиваем погоду при изменении города

    return (
        <div>
            <h1>Forecast</h1>
            <label>
                Choose city: 
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </label>
            {weather ? (
                <>
                    <h2>Weather in {city}</h2>
                    <Forecast data={weather} />
                    <WeatherChart data={weather} />
                </>
            ) : (
                <p>City not found</p>
            )}
        </div>
    );
}

export default App;