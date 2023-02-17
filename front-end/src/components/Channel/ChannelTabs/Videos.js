import React, { useState } from "react";
import { Stack, Grid, styled, Button, Box } from "@mui/material";
import { VideoContainer } from "../../Home/VideoContainer";

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
  max-width: 412px;
`;

const VideoFiltersContainer = styled(Stack)`
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
    padding-right: calc((100% - 428px) / 2);
    padding-left: calc((100% - 428px) / 2);
  }

  @media only screen and (min-width: 972px) {
    padding-right: calc((100% - 856px) / 2);
    padding-left: calc((100% - 856px) / 2);
  }

  @media only screen and (min-width: 1568px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

// pass a prop that contains an array of video objects
export const Videos = () => {
  const [filter, setFilter] = useState(false);

  return (
    <div>
      <VideoFiltersContainer direction="row" spacing={1}>
        <FilterButton value={!filter} onClick={() => setFilter(false)}>
          Recently Uploaded
        </FilterButton>
        <FilterButton value={filter} onClick={() => setFilter(true)}>
          Popular
        </FilterButton>
      </VideoFiltersContainer>
      <ContentContainer container spacing={0}>
        {text.map((t) => (
          <VideoOuterContainer item>
            <VideoContainer />
          </VideoOuterContainer>
        ))}
      </ContentContainer>
    </div>
  );
};
