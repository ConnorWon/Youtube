import React, { useState } from "react";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Box, Tab, styled, ThemeProvider } from "@mui/material";
import { colors, theme } from "../ColorThemes";
import { VideoDisplay } from "./VideoDisplay";

const TabContainer = styled(Box)`
  background-color: ${colors.bgColorDark};
`;

const HomeTab = styled(Tab)`
  color: ${colors.textGrey};
  margin: 0 10px 0 10px;
  padding: 12px 25px;
  font-family: Roboto;
  font-weight: 700;
`;

const HomeTabPanel = styled(TabPanel)`
  background-color: ${colors.bgColorDark};
  color: white;
  padding: 0px;
`;

export const HomeTabs = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <TabContainer
            sx={{
              borderBottom: 1,
              borderColor: "#393939",
              paddingRight: "12px",
              position: "fixed",
              width: "-webkit-fill-available",
              display: "flex",
            }}
          >
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
          <Box
            sx={{
              paddingTop: "24px",
              backgroundColor: colors.bgColorDark,
              position: "relative",
              zIndex: "-1",
              top: "49px",
            }}
          >
            {tabOptions.map((tab) => (
              <HomeTabPanel value={(tabCount++).toString()}>
                <VideoDisplay />
                {/* have to pass videos prop into components after performing a http request */}
              </HomeTabPanel>
            ))}
          </Box>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
};
