import { ChangeEvent } from "react";
import styled from "styled-components";
import { City } from "../types";

const SearchInput = styled.input`
  width: 100%;
  padding: 0 5px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 2px solid #707070;
  height: 45px;
  font-family: "Nunito";
  outline: none;
`;
const CityWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  place-content: center;
`;
const CityItem = styled.div`
  padding: 12px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;

  &:hover {
    background: #e9ecef;
  }

  &.active {
    background: #dee2e6;
    font-weight: bold;
  }
`;

interface CityListProps {
  cities: City[];
  onSelectCity: (city: City) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

function CityList({
  cities,
  onSelectCity,
  searchTerm,
  onSearchChange,
}: CityListProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <CityWrapper>
      <SearchInput
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {cities.map((city) => (
        <CityItem
          key={`${city.name}-${city.country}`}
          onClick={() => onSelectCity(city)}
        >
          {city.name}, {city.country}
        </CityItem>
      ))}
    </CityWrapper>
  );
}

export default CityList;
