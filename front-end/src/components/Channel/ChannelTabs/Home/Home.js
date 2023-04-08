import React from "react";
import { VideosScroll } from "./VideosScroll";
import { MainContainer } from "../Styling";

// dummy video data
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

// dummy video data
const sections = [
  ["1", true],
  ["2", true],
  ["3", false],
];

export const Home = (props) => {
  // sideExpand used for resizing MainContainer element
  const { sideExpand } = props;

  return (
    <MainContainer sideExpand={sideExpand}>
      <VideosScroll text={text} divider={false} section={["0", true]} />
      {sections.map((s) => (
        <VideosScroll text={text} divider={true} section={s} />
      ))}
    </MainContainer>
  );
};
