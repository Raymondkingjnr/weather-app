import { useEffect, useState } from "react";
import styled from "styled-components";
import { WeatherData, ForecastData } from "../types";
import { fetchWeather, fetchForecast } from "../useWeatherData";

const PopupContainer = styled.div`
  padding: 10px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  font-family: "Nunito";
`;

const WeatherHeader = styled.h3`
  text-align: center;
`;

const WeatherToday = styled.div`
  display: grid;
  place-content: center;
  border-bottom: 1px solid #eee;
`;

const Temp = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
`;

const WeatherDetails = styled.div`
  font-size: 14px;
  text-align: center;
  display: grid;
  gap: 8px;
  padding-bottom: 10px;
`;

const ForecastItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 14px;
`;

interface WeatherPopupProps {
  city: {
    name: string;
    country: string;
    lat: number;
    lng: number;
  };
}

function WeatherPopup({ city }: WeatherPopupProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [weatherData, forecastData] = await Promise.all([
          fetchWeather(city.lat, city.lng),
          fetchForecast(city.lat, city.lng),
        ]);
        setWeather(weatherData);
        setForecast(forecastData);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [city]);

  if (loading)
    return (
      <PopupContainer>
        {" "}
        <div className="spinner slow small"></div>
      </PopupContainer>
    );
  if (!weather || !forecast)
    return <PopupContainer>Weather data not available</PopupContainer>;

  const tomorrow = forecast?.daily.time[1];
  const tomorrowMaxTemp = forecast?.daily.temperature_2m_max[1];
  const tomorrowMinTemp = forecast.daily.temperature_2m_min[1];

  return (
    <PopupContainer>
      <WeatherHeader>
        {city.name}, {city.country}
      </WeatherHeader>

      <WeatherToday>
        <Temp>{Math.round(weather.current_weather.temperature)}°C</Temp>
        <WeatherDetails>
          <h3>Wind: {weather.current_weather.windspeed} km/h</h3>
          <h3>Humidity: {weather.hourly.relativehumidity_2m[0]}%</h3>
        </WeatherDetails>
      </WeatherToday>

      <div>
        <h4>Tomorrow's Forecast:</h4>
        <ForecastItem>
          <span>
            {Math.round(tomorrowMaxTemp)}° / {Math.round(tomorrowMinTemp)}°
          </span>
        </ForecastItem>
        <div style={{ fontSize: "12px", marginTop: "5px" }}>
          {new Date(tomorrow).toLocaleDateString("en-US", { weekday: "long" })}
        </div>
      </div>
    </PopupContainer>
  );
}

export default WeatherPopup;
