import {
  darkblueColor,
  greyColor,
  guttersPx,
  whiteColor,
} from "@/styles/variables";
import { ResetIcon } from "@/utils/formUtils/InputSvg/InputSvg";
import styled from "@emotion/styled";
import React from "react";
import SearchSuggestion from "./SearchSuggestion";

interface SearchSuggestionProp {
  search: string;
  handleSearch: (e: any) => void;
  handleReset?: () => void;
  isReset?: boolean;
  placeholder?: string;
}

const SearchBarInput = ({
  search,
  handleSearch,
  handleReset,
  isReset = false,
  placeholder = "Search",
}: SearchSuggestionProp) => {
  return (
    <SearchBoxContainer>
      <SearchBar>
        <SearchInput
          type="text"
          value={search}
          placeholder={placeholder}
          onChange={handleSearch}
        />
        <StyledSvg className="input-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <path
              d="M22.05 23.625L14.9625 16.5375C14.4 16.9875 13.7531 17.3438 13.0219 17.6062C12.2906 17.8687 11.5125 18 10.6875 18C8.64375 18 6.91425 17.292 5.499 15.876C4.08375 14.46 3.37575 12.7305 3.375 10.6875C3.375 8.64375 4.083 6.91425 5.499 5.499C6.915 4.08375 8.6445 3.37575 10.6875 3.375C12.7312 3.375 14.4608 4.083 15.876 5.499C17.2913 6.915 17.9993 8.6445 18 10.6875C18 11.5125 17.8687 12.2906 17.6062 13.0219C17.3438 13.7531 16.9875 14.4 16.5375 14.9625L23.625 22.05L22.05 23.625ZM10.6875 15.75C12.0938 15.75 13.2892 15.2576 14.274 14.2729C15.2587 13.2881 15.7507 12.093 15.75 10.6875C15.75 9.28125 15.2576 8.08575 14.2729 7.101C13.2881 6.11625 12.093 5.62425 10.6875 5.625C9.28125 5.625 8.08575 6.11738 7.101 7.10213C6.11625 8.08687 5.62425 9.282 5.625 10.6875C5.625 12.0938 6.11738 13.2892 7.10213 14.274C8.08687 15.2587 9.282 15.7507 10.6875 15.75Z"
              fill={greyColor}
            />
          </svg>
        </StyledSvg>
        {isReset && <ResetIcon reset={handleReset} />}
      </SearchBar>
      {isReset && <SearchSuggestion searchValue={search} />}
    </SearchBoxContainer>
  );
};

export default SearchBarInput;

const SearchBoxContainer = styled.div`
  position: relative;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${guttersPx.extraLarge};
  border: 1px solid ${greyColor};
  background: ${whiteColor};
  padding: ${guttersPx.small};
  max-height: 42px;
  &:focus-within {
    border-color: ${darkblueColor};
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: ${guttersPx.small};
  margin-left: ${guttersPx.medium};
  border-color: ${greyColor};
  &:focus {
    border-color: ${darkblueColor};
  }
  &:active {
    border-color: ${darkblueColor};
  }
  :focus ~ .input-icon > svg > path {
    fill: ${darkblueColor} !important;
  }
`;

const StyledSvg = styled.span`
  position: absolute;
  top: 53%;
  transform: translate(0, -50%);
  z-index: 999;
  left: ${guttersPx.mediumHalf};
`;
