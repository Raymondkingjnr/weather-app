import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { City } from "../types";
import WeatherPopup from "./weather-pop-up";
import styled from "styled-components";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;

  .leaflet-container {
    height: 100%;
    width: 100vh;
  }
`;

interface MapViewProps {
  selectedCity: City | null;
  cities: City[];
}

function MapView({ selectedCity, cities }: MapViewProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
  const [popupInfo, setPopupInfo] = useState<City | null>(null);
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});

  useEffect(() => {
    if (selectedCity) {
      setMapCenter([selectedCity.lat, selectedCity.lng]);
      setPopupInfo(selectedCity);

      setTimeout(() => {
        const marker =
          markerRefs.current[`${selectedCity.name}-${selectedCity.country}`];
        if (marker) {
          marker.openPopup();
        }
      }, 100);
    }
  }, [selectedCity]);

  return (
    <MapWrapper>
      <MapContainer
        center={mapCenter}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {cities.map((city) => (
          <Marker
            key={`${city.name}-${city.country}`}
            position={[city.lat, city.lng]}
            ref={(ref) => {
              if (ref) {
                markerRefs.current[`${city.name}-${city.country}`] = ref;
              }
            }}
            eventHandlers={{
              click: () => {
                setPopupInfo(city);
              },
            }}
          >
            <Popup>
              <WeatherPopup city={city} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </MapWrapper>
  );
}

export default MapView;
