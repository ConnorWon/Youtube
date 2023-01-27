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
];

const VideoOuterContainer = styled(Grid)`
  height: 270.61px;
  margin: 0px 8px 40px 8px;
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
