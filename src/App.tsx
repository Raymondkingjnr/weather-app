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
`;

const Button = styled.button`
  position: absolute;
  top: 1rem;
  right: 2rem;
  z-index: 200;
  cursor: pointer;
  background-color: #fff;
  width: 130px;
  border: none;
  text-align: center;
  height: 40px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 13px;
  font-family: "Nunito";
  color: #000;

  @media screen and (max-width: 785px) {
    right: 0.6rem;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  position: relative;
`;

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCities, setShowCites] = useState(false);

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handCityCity = () => {
    setShowCites((prev) => !prev);
  };

  return (
    <AppContainer>
      {showCities && (
        <CityList
          cities={filteredCities}
          onSelectCity={setSelectedCity}
          onClose={handCityCity}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      )}

      <MapContainer>
        <MapView selectedCity={selectedCity} cities={filteredCities} />
        <Button onClick={handCityCity}>Find City</Button>
      </MapContainer>
    </AppContainer>
  );
}

export default App;
