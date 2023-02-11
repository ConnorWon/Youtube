import { TabContext, TabList } from "@mui/lab";
import { Box, ThemeProvider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { theme } from "../ColorThemes";
import { Home } from "./ChannelTabs/Home";
import { ChannelVideos } from "./ChannelTabs/ChannelVideos";
import { TabContainer, ChannelTab, ChannelTabPanel } from "./Styling";

export const ChannelNavBar = () => {
  var currentURL = window.location.href.split("/");
  const defaultState = () => {
    console.log(currentURL.length);
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
              <Route path="" element={<Home />} />
              <Route path="/videos" element={<ChannelVideos />} />
              <Route path="/shorts" element={<ChannelVideos />} />
              <Route path="/live" element={<ChannelVideos />} />
              <Route path="/playlists" element={<ChannelVideos />} />
              <Route path="/community" element={<ChannelVideos />} />
              <Route path="/channels" element={<ChannelVideos />} />
              <Route path="/about" element={<ChannelVideos />} />
            </Routes>
          </ChannelTabPanel>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
};
