import React from "react";
import { Stack, Grid, styled } from "@mui/material";
import { VideoContainer } from "./VideoContainer";

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

  @media only screen and (min-width: 1144px) {
    max-height: 270.61px;
    max-width: 313.98px;
  }

  @media only screen and (min-width: 1800px) {
    max-height: 293.48px;
    max-width: 343.98px;
  }
`;

// pass a prop that contains an array of video objects
export const VideoDisplay = () => {
  return (
    <div>
      <Grid container spacing={0} sx={{ ml: "16px" }}>
        {text.map((t) => (
          <VideoOuterContainer item>
            <VideoContainer />
          </VideoOuterContainer>
        ))}
      </Grid>
    </div>
  );
};
