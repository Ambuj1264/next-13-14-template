import React from "react";
import styled from "@emotion/styled";
import {
  borderRadiusSmall,
  blackColor,
  whiteColor,
  navboxshadow,
  darkCharcoalColor,
  buttonCursor,
  greyColor,
  yellowColor,
  guttersPx,
  gutters,
} from "@/styles/variables";

import {
  typographySubtitle2Normal,
  typographyCaptionSmall,
} from "@/styles/typography";
import { useQueryContext } from "@/context/query/queryContext";
import { css } from "@emotion/core";
import { DotIcon, SerachLeftIcon } from "@/utils/formUtils/InputSvg/InputSvg";

type Props = {
  isColor: boolean;
};
const SuggestionBox = styled.div`
  width: 353px;
  max-height: 300px;
  overflow: auto;
  border-radius: ${borderRadiusSmall};
  border: 0.5px solid ${blackColor};
  background: ${whiteColor};
  box-shadow: 0px 2px 4px 0px ${navboxshadow};
  padding: ${guttersPx.medium};
  z-index: ${gutters.large * 2};
  position: absolute;
  top: ${gutters.extraLarge}px;
  left: 50%;
  transform: translate(-50%, ${guttersPx.medium});
`;

const Heading = styled.div(
  [typographyCaptionSmall],
  `
  border-bottom: 1px solid ${darkCharcoalColor};
  color: ${darkCharcoalColor};
  margin-bottom: ${guttersPx.smallHalf};
  width:fit-content;
`,
);
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${guttersPx.medium};
  padding: ${guttersPx.smallHalf} 0;
  cursor: ${buttonCursor};
`;

const SuggestedContent = styled.div`
  padding: ${guttersPx.small} 0;
`;

const FullName = styled.div<Props>(
  ({ isColor }) => css`
    ${typographySubtitle2Normal};
    color: ${darkCharcoalColor};
    background: ${isColor ? yellowColor : "none"};
  `,
);

const NameWrapper = styled.div`
  display: flex;
`;
const SpanDIV = styled.div(
  [typographyCaptionSmall],
  `
  color: ${greyColor};
  display:flex;
  align-items:center;
  gap:${guttersPx.smallHalf}
`,
);
const NotFound = styled.div`
  margin-top: ${guttersPx.smallHalf};
  color: ${darkCharcoalColor};
`;
const SearchSuggestion = ({ searchValue }: { searchValue: string }) => {
  const { setDealId, saveSearchData, setDealDetailModal } = useQueryContext();
  const filteredSearchData = saveSearchData?.filter(
    (val: { node: { name: string } }) => {
      return val?.node?.name
        ?.toLowerCase()
        ?.includes(searchValue?.toLocaleLowerCase()?.trim());
    },
  );

  const handleUserDetail = (id: string) => {
    setDealId(id);
    setDealDetailModal(true);
  };

  return (
    <SuggestionBox>
      <Heading>All search results </Heading>
      {filteredSearchData?.length > 0 ? (
        <SuggestedContent>
          {filteredSearchData?.map(
            (item: {
              node: {
                name: string;
                id: string;
                organization: string;
                tags: string[];
              };
              id: string;
            }) => {
              const { node } = item || {};
              const { name, id, organization, tags } = node || {};
              const username = name?.split("");
              return (
                <FlexBox key={id} onClick={() => handleUserDetail(id)}>
                  <SerachLeftIcon />
                  <div>
                    <NameWrapper>
                      {username?.map((nameitem) => {
                        const isColor = searchValue.includes(
                          nameitem.toLowerCase(),
                        );
                        const getname = nameitem.includes(" ") ? (
                          <>&nbsp;</>
                        ) : (
                          <>{nameitem}</>
                        );
                        return (
                          <FullName key={nameitem} isColor={isColor}>
                            {getname}
                          </FullName>
                        );
                      })}
                    </NameWrapper>
                    <SpanDIV>
                      <p>{organization}</p>
                      {tags?.map((itemtags) => (
                        <>
                          <DotIcon /> <span>{itemtags}</span>
                        </>
                      ))}
                    </SpanDIV>
                  </div>
                </FlexBox>
              );
            },
          )}
        </SuggestedContent>
      ) : (
        <NotFound> No search result found</NotFound>
      )}
    </SuggestionBox>
  );
};

export default SearchSuggestion;
