import React from "react";
import { Stack, styled } from "@mui/material";

const VideoButtonsContainer = styled(Stack)`
  height: 48px;
  line-height: 48px;
  font-size: 109%;
  text-align: left;
  ${"" /* direction: "row" */}
`;

const LeftButtons = styled(Stack)`
  height: 100%;
  float: left;
  display: flex;
  -webkit-box-flex: 1;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const VideoButtons = () => {
  return <VideoButtonsContainer>VideoButtons</VideoButtonsContainer>;
};
