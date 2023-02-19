import React from "react";
import { styled } from "@mui/material";
import { VideosScroll } from "./VideosScroll";

const HomeContainer = styled("div")`
  @media only screen and (min-width: 0px) {
    padding-right: calc((100% - 428px) / 2);
    padding-left: calc((100% - 428px) / 2);
  }

  @media only screen and (min-width: 686px) {
    padding-right: calc((100% - 642px) / 2);
    padding-left: calc((100% - 642px) / 2);
  }

  @media only screen and (min-width: 972px) {
    padding-right: calc((100% - 856px) / 2);
    padding-left: calc((100% - 856px) / 2);
  }

  @media only screen and (min-width: 1186px) {
    padding-right: calc((100% - 1070px) / 2);
    padding-left: calc((100% - 1070px) / 2);
  }

  @media only screen and (min-width: 1400px) {
    padding-right: calc((100% - 1284px) / 2);
    padding-left: calc((100% - 1284px) / 2);
  }
`;

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

const sections = [
  ["1", true],
  ["2", true],
  ["3", false],
];

export const Home = () => {
  return (
    <HomeContainer>
      <VideosScroll text={text} divider={false} section={["0", true]} />
      {sections.map((s) => (
        <VideosScroll text={text} divider={true} section={s} />
      ))}
    </HomeContainer>
  );
};
