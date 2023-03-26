import React, { useState } from "react";
import { Stack, Grid, styled, Button, Box } from "@mui/material";
import { VideoContainer } from "../../Home/VideoContainer";
import { MainContainer } from "./Styling";

const text = [
  "Video 1",
  "Video 2",
  "Video 3",
  "Video 4",
  "Video 5",
  "Video 6",
  "Video 7",
  "Video 8",
  "Video 1",
  "Video 2",
  "Video 3",
  "Video 4",
  "Video 5",
  "Video 6",
  "Video 7",
  "Video 8",
];

const VideoOuterContainer = styled(Grid)`
  margin: 0px 8px 40px 8px;
  max-width: 360px;

  @media only screen and (min-width: 1187px) {
    max-width: 340px;
  }

  @media only screen and (min-width: 1313px) and (max-width: 1354px) {
    max-width: ${({ sideExpand }) => (sideExpand ? "360px" : "340px")};
  }

  @media only screen and (min-width: 1401px) {
    max-width: ${({ sideExpand }) => (sideExpand ? "340px" : "360px")};
  }

  @media only screen and (min-width: 1569px) {
    max-width: 360px;
  }
`;

const VideoFiltersContainer = styled(Stack)`
  padding-top: 16px;
  padding-bottom: 12px;
`;

const FilterButton = styled(Button)`
  color: ${({ value }) => (value ? "#0f0f0f" : "white")};
  background-color: ${({ value }) => (value ? "white" : "rgb(63, 63, 63)")};
  text-transform: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  border-radius: 8px;

  :hover {
    background-color: ${({ value }) =>
      value ? "rgba(256, 256, 256, 1)" : "rgba(256, 256, 256, 0.3)"};
  }
`;

const ContentContainer = styled(Grid)`
  width: 100%;
  display: flex;

  @media only screen and (min-width: 0px) {
    padding-right: calc((100% - 376px) / 2);
    padding-left: calc((100% - 376px) / 2);
  }

  @media only screen and (min-width: 972px) {
    padding-right: calc((100% - 752px) / 2);
    padding-left: calc((100% - 752px) / 2);
  }

  @media only screen and (min-width: 1187px) {
    padding-right: calc((100% - 1068px) / 2);
    padding-left: calc((100% - 1068px) / 2);
  }

  @media only screen and (min-width: 1313px) and (max-width: 1354px) {
    padding-right: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 752px) / 2)" : "calc((100% - 1068px) / 2)"};
    padding-left: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 752px) / 2)" : "calc((100% - 1068px) / 2)"};
  }

  @media only screen and (min-width: 1401px) {
    padding-right: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 1068px) / 2)" : "calc((100% - 1128px) / 2)"};
    padding-left: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 1068px) / 2)" : "calc((100% - 1128px) / 2)"};
  }

  @media only screen and (min-width: 1569px) {
    padding-right: calc((100% - 1128px) / 2);
    padding-left: calc((100% - 1128px) / 2);
  }
`;

// pass a prop that contains an array of video objects
export const Videos = (props) => {
  const [filter, setFilter] = useState(false);
  const { sideExpand } = props;

  return (
    <MainContainer sideExpand={sideExpand}>
      <VideoFiltersContainer direction="row" spacing={1}>
        <FilterButton value={!filter} onClick={() => setFilter(false)}>
          Recently Uploaded
        </FilterButton>
        <FilterButton value={filter} onClick={() => setFilter(true)}>
          Popular
        </FilterButton>
      </VideoFiltersContainer>
      <ContentContainer container spacing={0} sideExpand={sideExpand}>
        {text.map((t) => (
          <VideoOuterContainer item sideExpand={sideExpand}>
            <VideoContainer />
          </VideoOuterContainer>
        ))}
      </ContentContainer>
    </MainContainer>
  );
};
