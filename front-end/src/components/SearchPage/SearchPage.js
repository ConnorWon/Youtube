import {
  styled,
  Box,
  Typography,
  Collapse,
  Button,
  Stack,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../ColorThemes";
import TuneIcon from "@mui/icons-material/Tune";
import { HorizontalVideo } from "./HorizontalVideo";

const MainContainer = styled("div")`
  flex: 1;
  flex-basis: 1e-9px;
  padding: 16px 24px;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  z-index: 0;
  background-color: ${colors.bgColorDark};
`;

const OuterContainer = styled(Box)`
  min-width: 0px;
  flex: 1;
  flex-basis: 1e-9px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const OuterColumnContainer = styled(Box)`
  min-width: 0;
  flex: 1;
  flex-basis: 1e-9px;
  max-width: 1280px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MainColumnContainer = styled(Box)`
  max-width: 1096px;
  min-width: 0;
  flex: 1 1 auto;
`;

const InnerColumnContainer = styled(Box)`
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const FiltersMenu = styled(Box)`
  border-bottom: 1px solid ${colors.borderColor};
`;

const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FilterButton = styled(Button)`
  display: flex;
  flex: 1;
  flex-basis: 1e-9px;
  margin-left: -10px;
  color: ${colors.textWhite};
  padding: 0 16px;
  height: 36px;
  max-width: 95.16px;
  border-radius: 18px;
  text-decoration: none;
  text-transform: none;
`;

const IconContainer = styled(Box)`
  margin-right: 6px;
  margin-left: -6px;
  height: 24px;
  width: 24px;
`;

const ButtonText = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  whitespace: nowrap;
  font-size: 14px;
  line-height: 36px;
  font-family: Roboto;
  letter-spacing: 0;
  font-weight: 500;
`;

const FilterCollapsible = styled(Collapse)``;

const MenuContent = styled(Stack)`
  margin-bottom: 32px;
`;

const FilterGroup = styled(Stack)`
  padding: 0 32px 0 0;
  flex: 1;
  flex-basis: 1e-9px;
`;

const FilterGroupHeader = styled(Typography)`
  color: ${colors.textWhite};
  border-bottom: 1px solid ${colors.borderColor};
  margin: 5px 0;
  text-transform: uppercase;
  padding: 15px 0;
  font-family: Roboto;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
`;

const FilterType = styled(Link)`
  text-transform: none;
  text-decoration: none;
  padding: 15px 0 0;
  font-size: 14px;
  color: ${colors.textGrey};
`;

const ContentContainer = styled(Box)``;

const filters = [
  [
    "Upload Date",
    ["Last hour", "Today", "This week", "This month", "This year"],
  ],
  ["Type", ["Video", "Channel", "Playlist", "Movie"]],
  ["Duration", ["Under 4 minutes", "4 - 20 minutes", "Over 20 minutes"]],
  [
    "Features",
    [
      "Live",
      "4K",
      "HD",
      "Subtitles/CC",
      "Creative Commons",
      "360\u00B0",
      "VR180",
      "3D",
      "HDR",
      "Location",
      "Purchased",
    ],
  ],
  ["Sort By", ["Relevance", "Upload Date", "View Count", "Rating"]],
];

const videos = [1, 2, 3, 4, 5];

export const SearchPage = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <MainContainer>
      <OuterContainer>
        <OuterColumnContainer>
          <MainColumnContainer>
            <InnerColumnContainer>
              <FiltersMenu>
                <ButtonContainer>
                  <FilterButton onClick={() => handleClick()}>
                    <IconContainer>
                      <TuneIcon />
                    </IconContainer>
                    <ButtonText>Filters</ButtonText>
                  </FilterButton>
                </ButtonContainer>
                <FilterCollapsible in={open} timeout="auto">
                  <MenuContent direction="row">
                    {filters.map((filter) => (
                      <FilterGroup>
                        <FilterGroupHeader>{filter[0]}</FilterGroupHeader>
                        {filter[1].map((type) => (
                          <FilterType>{type}</FilterType>
                        ))}
                      </FilterGroup>
                    ))}
                  </MenuContent>
                </FilterCollapsible>
              </FiltersMenu>
              <ContentContainer>
                {videos.map((video) => (
                  <HorizontalVideo />
                ))}
              </ContentContainer>
            </InnerColumnContainer>
          </MainColumnContainer>
        </OuterColumnContainer>
      </OuterContainer>
    </MainContainer>
  );
};
