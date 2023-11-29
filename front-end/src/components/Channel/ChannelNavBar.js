import { TabContext, TabList } from "@mui/lab";
import { Box, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { theme } from "../../utils/ColorThemes";
import { About } from "./ChannelTabs/About";
import { Channels } from "./ChannelTabs/Channels";
import { Community } from "./ChannelTabs/Community";
import { Home } from "./ChannelTabs/Home/Home";
import { Videos } from "./ChannelTabs/Videos";
import { Shorts } from "./ChannelTabs/Shorts";
import { TabContainer, ChannelTab, ChannelTabPanel } from "./Styling";
import { Playlists } from "./ChannelTabs/Playlists";

export const ChannelNavBar = (props) => {
  const { sideExpand } = props;

  // used to ensure tab indicator is underlining correct tab
  var currentURL = window.location.href.split("/");
  const defaultState = () => {
    if (currentURL.length === 4) {
      return "/channel";
    } else {
      return "/channel/" + currentURL[currentURL.length - 1];
    }
  };

  const prevPath = "/channel";

  // data for routing and tab display
  const tabRoutes = [
    ["", <Home sideExpand={sideExpand} />, "Home"],
    ["/videos", <Videos sideExpand={sideExpand} />, "Videos"],
    ["/shorts", <Shorts sideExpand={sideExpand} />, "Shorts"],
    ["/live", <Videos sideExpand={sideExpand} />, "Live"],
    ["/playlists", <Playlists sideExpand={sideExpand} />, "Playlists"],
    ["/community", <Community sideExpand={sideExpand} />, "Community"],
    ["/channels", <Channels sideExpand={sideExpand} />, "Channels"],
    ["/about", <About sideExpand={sideExpand} />, "About"],
  ];

  // state used to track tab
  const [value, setValue] = useState(defaultState);
  // handles changing of tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <TabContext value={value}>
          <TabContainer sx={{ borderBottom: 1, borderColor: "#393939" }}>
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
                "& .MuiTabs-scrollButtons": {
                  "@media(min-width: 0)": {
                    display: "flex",
                  },
                },
              }}
            >
              {tabRoutes.map((path) => (
                <ChannelTab
                  label={path[2]}
                  value={prevPath + path[0]}
                  component={Link}
                  to={prevPath + path[0]}
                />
              ))}
            </TabList>
          </TabContainer>
          <ChannelTabPanel>
            <Routes>
              {tabRoutes.map((path) => (
                <Route path={path[0]} element={path[1]} />
              ))}
            </Routes>
          </ChannelTabPanel>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
};
