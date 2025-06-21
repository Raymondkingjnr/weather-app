import styled from "styled-components";
import { City } from "../types";
import { IoClose } from "react-icons/io5";
import { ChangeEvent } from "react";

const Container = styled.div`
  position: absolute;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0px;
  background: #0000006e;
  z-index: 1000;
  padding: 10px 20px;
`;
const CityWrapper = styled.div`
  width: 20%;

  position: absolute;
  top: 0px;
  left: 0;
  bottom: 0;
  background: white;
  z-index: 1000;
  padding: 10px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1050px) {
    width: 50%;
  }
  @media screen and (max-width: 600px) {
    width: 70%;
  }
`;
const Content = styled.div`
  overflow-y: scroll;
  gap: 10px;
  height: 100vh;
  position: relative;
  padding: 20px 0;
  &::-webkit-scrollbar {
    display: none;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: end;
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

const SearchInput = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 2px solid gray;
  height: 35px;
  font-family: "Nunito";
  border: 2px solid #c4c4c4;
  padding: 0 5px;
  outline: none;
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

interface CityListProps {
  cities: City[];
  onSelectCity: (city: City) => void;
  onClose?: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const CityList = ({
  cities,
  onSelectCity,
  onClose,
  searchTerm,
  onSearchChange,
}: CityListProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <Container>
      <CityWrapper>
        <Content>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IconWrapper>
              <IoClose size={30} onClick={onClose} />
            </IconWrapper>
          </SearchContainer>
          {cities.map((city) => (
            <CityItem
              key={`${city.name}-${city.country}`}
              onClick={() => {
                onSelectCity(city);
                onClose?.();
              }}
            >
              {city.name}, {city.country}
            </CityItem>
          ))}
        </Content>
      </CityWrapper>
    </Container>
  );
};

export default CityList;
