import {FC, useState} from "react";
import {
  MainContainer,
  VideoOuterContainer,
  VideoFiltersContainer,
  FilterButton,
  ContentContainer,
} from "./Styling";
import { VideoContainer } from "../../../components/VerticalVideoContainer";
import {DUMMY_VIDEOS} from "../../../utils/Constants";

// pass a prop that contains an array of video objects
export const Videos: FC<{sideExpand: boolean}> = (props) => {
  // sideExpand used for resizing MainContainer element
  const { sideExpand } = props;

  // state that tracks whether videos filtered by popular or recency
  const [filter, setFilter] = useState<boolean>(false);

  return (
    <MainContainer sideExpand={sideExpand}>
      <VideoFiltersContainer direction="row" spacing={1}>
        <FilterButton isFiltered={!filter} onClick={() => setFilter(false)}>
          Recently Uploaded
        </FilterButton>
        <FilterButton isFiltered={filter} onClick={() => setFilter(true)}>
          Popular
        </FilterButton>
      </VideoFiltersContainer>
      <ContentContainer container spacing={0} sideExpand={sideExpand}>
        {DUMMY_VIDEOS.map(() => (
          <VideoOuterContainer item sideExpand={sideExpand}>
            <VideoContainer inChannel={true} inChannelHome={false} />
          </VideoOuterContainer>
        ))}
      </ContentContainer>
    </MainContainer>
  );
};
