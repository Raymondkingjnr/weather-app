import { useState, useMemo } from "react";
import styled from "styled-components";
import MapView from "./components/map-view";
import CityList from "./components/cities-list";
import { City } from "./types";
import { cities } from "./cities";

const AppContainer = styled.div`
  display: flex;

  gap: 10px;
  height: 100vh;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    /* justify-content: center;
    align-items: center; */
  }
`;

const Sidebar = styled.div`
  width: 300px;
  background: #f8f9fa;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: calc(100% - 20px);
    margin: 0 auto;
    height: 270px;
    padding: 20px;
  }
`;

const MapContainer = styled.div`
  flex: 1;
`;

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <AppContainer>
      <Sidebar>
        <CityList
          cities={filteredCities}
          onSelectCity={setSelectedCity}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </Sidebar>
      <MapContainer>
        <MapView selectedCity={selectedCity} cities={filteredCities} />
      </MapContainer>
    </AppContainer>
  );
}

export default App;
