import { useEffect, useState } from "react";
import Search from "./Search.jsx";
import config from "./config.js";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchWeatherData(param) {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${config.openWeather}`
      );

      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError("City not found. Please check the city name and try again.");
      }
    } catch (error) {
      setError("An error occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    fetchWeatherData("nagpur");
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {error ? (
        <div className="text-4xl text-red-900 text-center mt-12">{error}</div>
      ) : loading ? (
        <div className="flex justify-center items-center mt-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">
                {weatherData?.name}, <span className="text-emerald-400">{weatherData?.sys?.country}</span>
              </h2>
              <div className="text-gray-400 font-medium">
                {getCurrentDate()}
              </div>
              <div className="text-5xl font-bold mt-4 text-white">
                {weatherData?.main?.temp && `${Math.round(weatherData.main.temp - 273.15)}°C`}
              </div>
            </div>
            <p className="text-center text-xl text-emerald-400 capitalize mb-8">
              {weatherData && weatherData.weather[0]
                ? weatherData.weather[0].description
                : "Weather description unavailable"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-700/30 rounded-xl p-6 text-center">
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 text-emerald-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <p className="text-2xl font-bold mb-1">{weatherData?.wind?.speed} m/s</p>
                  <p className="text-gray-400">Wind Speed</p>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-xl p-6 text-center">
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 text-emerald-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <p className="text-2xl font-bold mb-1">{weatherData?.main?.humidity}%</p>
                  <p className="text-gray-400">Humidity</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

