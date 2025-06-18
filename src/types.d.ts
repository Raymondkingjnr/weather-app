export interface City {
  name: string;
  country: string;
  lat: number;
  lng: number;
}

export interface WeatherData {
  latitude: number;
  longitude: number;

  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
  };
  hourly: {
    time: string[];
    relativehumidity_2m: number[];
  };
}

export interface ForecastData {
  latitude: number;
  longitude: number;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}
