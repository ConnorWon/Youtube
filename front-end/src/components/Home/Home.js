import React, { useEffect, useState } from "react";
import {
  TabContainer,
  HomeTab,
  HomeTabPanel,
  HomeTabPanelContainer,
} from "./Styling";
import { TabContext, TabList } from "@mui/lab";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "../ColorThemes";
import { VideoDisplay } from "./VideoDisplay";

export const Home = (props) => {
  // tracks which video tab user is in
  const [value, setValue] = useState("0");
  // handles changing of tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { setModalSideExpand } = props;

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

  return (
    <ThemeProvider theme={theme}>
      <Box>
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
                <VideoDisplay />
                {/* have to pass videos prop into components after performing a http request */}
              </HomeTabPanel>
            ))}
          </HomeTabPanelContainer>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
};
