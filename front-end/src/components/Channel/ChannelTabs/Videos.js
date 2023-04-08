import React, { useState } from "react";
import {
  MainContainer,
  VideoOuterContainer,
  VideoFiltersContainer,
  FilterButton,
  ContentContainer,
} from "./Styling";
import { VideoContainer } from "../../VerticalVideoContainer";

// dummy videos
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

// pass a prop that contains an array of video objects
export const Videos = (props) => {
  // sideExpand used for resizing MainContainer element
  const { sideExpand } = props;

  // state that tracks whether videos filtered by popular or recency
  const [filter, setFilter] = useState(false);

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
            <VideoContainer inChannel={"true"} />
          </VideoOuterContainer>
        ))}
      </ContentContainer>
    </MainContainer>
  );
};
