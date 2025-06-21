import React, { ChangeEvent } from "react";
import styled from "styled-components";
interface CityListProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
const Search = ({ searchTerm, onSearchChange }: CityListProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };
  return (
    <div>
      <SearchInput
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;

const SearchInput = styled.input`
  width: 500px;
  padding: 0 5px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: none;
  height: 45px;
  font-family: "Nunito";
  outline: none;
  position: absolute;
  top: 1rem;
  left: 5rem;
  z-index: 100;
`;
