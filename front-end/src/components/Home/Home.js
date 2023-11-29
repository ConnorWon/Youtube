import React, { useContext, useEffect, useState } from "react";
import {
  TabContainer,
  HomeTab,
  HomeTabPanel,
  HomeTabPanelContainer,
  VideoGrid,
  VideoOuterContainer,
} from "./Styling";
import { TabContext, TabList } from "@mui/lab";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "../../utils/ColorThemes";
import { VideoContainer } from "../VerticalVideoContainer";
import { SidebarContext } from "../../contexts/SidebarContext";

export const Home = () => {
  // tracks which video tab user is in
  const [value, setValue] = useState("0");
  // handles changing of tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { setModalSideExpand } = useContext(SidebarContext);

  // used to close modal sidebar after switching to this page from another
  useEffect(() => {
    setModalSideExpand(false);
  }, []);

  const tabOptions = [
    "Apple",
    "Orange",
    "Banana",
    "Grape",
    "Pineapple",
    "Canteloupe",
    "Blueberry",
    "Strawberry",
    "Watermelon",
    "Papaya",
    "Grapefruit",
    "Honeydew",
    "Blackberry",
    "Raspberry",
  ];

  var tabCount = 0;

  // dummy data for video display
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

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <TabContainer>
          <TabList
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="secondary"
            indicatorColor="primary"
            sx={{
              "& .MuiTabScrollButton-root": {
                color: "#aaaaaa",
              },
            }}
          >
            {tabOptions.map((tab) => (
              <HomeTab label={tab} value={(tabCount++).toString()} />
            ))}
            {(tabCount = 0)}
          </TabList>
        </TabContainer>
        <HomeTabPanelContainer>
          {tabOptions.map((tab) => (
            <HomeTabPanel value={(tabCount++).toString()}>
              <VideoGrid container spacing={0}>
                {text.map((t) => (
                  <VideoOuterContainer item>
                    <VideoContainer />
                  </VideoOuterContainer>
                ))}
              </VideoGrid>
              {/* have to pass videos prop into components after performing a http request */}
            </HomeTabPanel>
          ))}
        </HomeTabPanelContainer>
      </TabContext>
    </ThemeProvider>
  );
};
