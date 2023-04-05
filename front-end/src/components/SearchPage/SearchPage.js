import { Tooltip } from "@mui/material";
import {
  MainContainer,
  OuterContainer,
  OuterColumnContainer,
  MainColumnContainer,
  InnerColumnContainer,
  FiltersMenu,
  ButtonContainer,
  FilterButton,
  IconContainer,
  ButtonText,
  FilterCollapsible,
  MenuContent,
  FilterGroup,
  FilterGroupHeader,
  FilterType,
  ContentContainer,
} from "./Styling";
import React, { useState, useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { HorizontalVideo } from "./HorizontalVideo";

// labels and filters used for filter tab
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

// dummy data to produce videos on page
const videos = [1, 2, 3, 4, 5];

export const SearchPage = (props) => {
  // state for opening filter tab
  const [open, setOpen] = useState(false);

  // handles opening and closing filter tab
  const handleClick = () => {
    setOpen(!open);
  };

  const { setModalSideExpand } = props;

  // used to close modal sidebar after switching to this page from another
  useEffect(() => {
    setModalSideExpand(false);
  }, []);

  return (
    <MainContainer>
      <OuterContainer>
        <OuterColumnContainer>
          <MainColumnContainer>
            <InnerColumnContainer>
              <FiltersMenu>
                <ButtonContainer>
                  <Tooltip
                    title={
                      open ? "Close search filters" : "Open search filters"
                    }
                  >
                    <FilterButton onClick={() => handleClick()}>
                      <IconContainer>
                        <TuneIcon />
                      </IconContainer>
                      <ButtonText>Filters</ButtonText>
                    </FilterButton>
                  </Tooltip>
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
