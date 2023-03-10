import { TabContext, TabList } from "@mui/lab";
import { Box, ThemeProvider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { theme } from "../ColorThemes";
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

  var currentURL = window.location.href.split("/");
  const defaultState = () => {
    if (currentURL.length == 4) {
      return "/channel";
    } else {
      return "/channel/" + currentURL[currentURL.length - 1];
    }
  };
  const prevPath = "/channel";

  const tabRoutes = [
    "",
    "/videos",
    "/shorts",
    "/live",
    "/playlists",
    "/community",
    "/channels",
    "/about",
  ];

  const [value, setValue] = useState(defaultState);
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
                ml: "25px",
                "& .MuiTabScrollButton-root": {
                  color: "#aaaaaa",
                },
              }}
            >
              <ChannelTab
                label="Home"
                value={prevPath + tabRoutes[0]}
                component={Link}
                to={prevPath + tabRoutes[0]}
              />
              <ChannelTab
                label="Videos"
                value={prevPath + tabRoutes[1]}
                component={Link}
                to={prevPath + tabRoutes[1]}
              />
              <ChannelTab
                label="Shorts"
                value={prevPath + tabRoutes[2]}
                component={Link}
                to={prevPath + tabRoutes[2]}
              />
              <ChannelTab
                label="Live"
                value={prevPath + tabRoutes[3]}
                component={Link}
                to={prevPath + tabRoutes[3]}
              />
              <ChannelTab
                label="Playlists"
                value={prevPath + tabRoutes[4]}
                component={Link}
                to={prevPath + tabRoutes[4]}
              />
              <ChannelTab
                label="Community"
                value={prevPath + tabRoutes[5]}
                component={Link}
                to={prevPath + tabRoutes[5]}
              />
              <ChannelTab
                label="Channels"
                value={prevPath + tabRoutes[6]}
                component={Link}
                to={prevPath + tabRoutes[6]}
              />
              <ChannelTab
                label="About"
                value={prevPath + tabRoutes[7]}
                component={Link}
                to={prevPath + tabRoutes[7]}
              />
            </TabList>
          </TabContainer>
          <ChannelTabPanel>
            <Routes>
              <Route path="" element={<Home sideExpand={sideExpand} />} />
              <Route
                path="/videos"
                element={<Videos sideExpand={sideExpand} />}
              />
              <Route
                path="/shorts"
                element={<Shorts sideExpand={sideExpand} />}
              />
              <Route
                path="/live"
                element={<Videos sideExpand={sideExpand} />}
              />
              <Route
                path="/playlists"
                element={<Playlists sideExpand={sideExpand} />}
              />
              <Route
                path="/community"
                element={<Community sideExpand={sideExpand} />}
              />
              <Route
                path="/channels"
                element={<Channels sideExpand={sideExpand} />}
              />
              <Route
                path="/about"
                element={<About sideExpand={sideExpand} />}
              />
            </Routes>
          </ChannelTabPanel>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
};
