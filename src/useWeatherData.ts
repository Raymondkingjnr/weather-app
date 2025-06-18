import { WeatherData, ForecastData } from "./types";

const OPEN_METEO_URL = "https://api.open-meteo.com/v1";

export async function fetchWeather(
  lat: number,
  lng: number
): Promise<WeatherData> {
  const response = await fetch(
    `${OPEN_METEO_URL}/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=relativehumidity_2m&timezone=auto`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
}

export async function fetchForecast(
  lat: number,
  lng: number
): Promise<ForecastData> {
  const response = await fetch(
    `${OPEN_METEO_URL}/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }
  return response.json();
}
