import { scrollStyle } from "@/styles/base";
import { typographyParagraph } from "@/styles/typography";
import {
  darkblueColor,
  darkCharcoalColor,
  guttersPx,
  whiteColor,
} from "@/styles/variables";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import SearchBarInput from "./SearchBarInput";

const AutoComplete = ({
  setValue,
  isClose,
}: {
  setValue: (arg: string) => void;
  isClose: (arg: boolean) => void;
}) => {
  const [selectedHashtag, setSelectedHashtag] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>(hashtags);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase().trim();
    const filteredHashtags =
      inputValue !== ""
        ? hashtags.filter((hashtag) =>
            hashtag.toLowerCase().includes(inputValue),
          )
        : hashtags;
    setSuggestions(filteredHashtags);
    setSelectedHashtag(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
  };
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        isClose(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClose]);

  return (
    <>
      <StyledAutoComplete ref={ref}>
        <SearchWrapper>
          <SearchBarInput
            search={selectedHashtag}
            placeholder="customer"
            handleSearch={handleInputChange}
          />
        </SearchWrapper>
        <List>
          {suggestions.map((suggestion: string, index: number) => (
            <ListItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </ListItem>
          ))}
        </List>
      </StyledAutoComplete>
    </>
  );
};

export default AutoComplete;

const SearchWrapper = styled.div`
  div {
    border-radius: 10px;
  }
`;
const StyledAutoComplete = styled.div`
  max-width: 335px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background: var(--White, #fff);
  box-shadow: 0px 4px 4px 0px rgb(0 0 0 / 25%);
`;

const List = styled.ul`
  width: 300px;
  background: #fff;
  box-shadow: darkslategrey;
  list-style: none;
  /* margin-top: 10px; */
  padding: 20px 0;
  max-height: 150px;
  overflow: auto;
  ${scrollStyle}
`;
const ListItem = styled.div`
  padding: ${guttersPx.mediumHalf} ${guttersPx.medium};
  ${typographyParagraph};
  color: ${darkCharcoalColor};
  &:hover {
    background: ${darkblueColor};
    color: ${whiteColor};
  }
`;

const hashtags = [
  "#socialmotion",
  "#Development",
  "#Dev",
  "#Frontend",
  "#local",
  "#Database",
  "#Server",
  "#Backend",
  "#Developer",
  "#React",
  "#Next",
  "#Node",
  "#graphQl",
];
