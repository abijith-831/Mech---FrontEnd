import React, { useEffect, useState } from "react";
import axios from "axios";
import { WeatherData } from "../Types/weatherTypes";

const Weather = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const API_KEY = "c6b016406f5cee327a689fb5ff1c26a8";

  useEffect(() => {
    if (!city) {
      setError("Please enter a city name!");
      return;
    }

    async function fetchWeather() {
      try {
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        setWeather(response.data);
        setError("");
      } catch (error) {
        setError("City was not found");
        setWeather(null);
      }
    }

    fetchWeather();
  }, [city]);

  return (
    
    <div className="flex flex-col items-center justify-center bg-gradient-to-b mt-10 from-blue-400 to-yellow-300 p-6">
      <br /><br />
      <h1 className="text-3xl font-bold text-white mb-6">Weather App</h1>
      <input
        type="text"
        placeholder="Enter City Name"
        className="p-2 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {weather && (
        <div className="mt-6 p-6 bg-white bg-opacity-80 rounded-lg shadow-lg w-80 text-center">
          <h2 className="text-2xl font-bold text-blue-700">{weather.name}</h2>
          <p className="text-lg text-gray-700">{weather.weather[0].description}</p>
          <h3 className="text-4xl font-bold text-yellow-500">{weather.main.temp}°C</h3>
          <p className="text-gray-700">Humidity: {weather.main.humidity}%</p>
          <p className="text-gray-700">Wind Speed: {weather.wind.speed} km/h</p>
        </div>
        
      )}
      <br /><br /><br /><br /><br /><br />
      
    </div>
  );
};

export default Weather;
