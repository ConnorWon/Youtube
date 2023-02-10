import { TabContext, TabList } from "@mui/lab";
import { Box, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { theme } from "../ColorThemes";
import { ChannelVideos } from "./ChannelVideos";
import { TabContainer, ChannelTab, ChannelTabPanel } from "./Styling";

export const ChannelNavBar = () => {
  const [value, setValue] = useState("1");
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
              <ChannelTab label="Home" value="1" />
              <ChannelTab label="Videos" value="2" />
              <ChannelTab label="Shorts" value="3" />
              <ChannelTab label="Live" value="4" />
              <ChannelTab label="Playlists" value="5" />
              <ChannelTab label="Community" value="6" />
              <ChannelTab label="Channels" value="7" />
              <ChannelTab label="About" value="8" />
            </TabList>
          </TabContainer>
          <Box>
            <ChannelTabPanel value="1">Home</ChannelTabPanel>
            <ChannelTabPanel value="2">
              <ChannelVideos />
            </ChannelTabPanel>
            <ChannelTabPanel value="3">Shorts</ChannelTabPanel>
            <ChannelTabPanel value="4">Live</ChannelTabPanel>
            <ChannelTabPanel value="5">Playlists</ChannelTabPanel>
            <ChannelTabPanel value="6">Community</ChannelTabPanel>
            <ChannelTabPanel value="7">Channels</ChannelTabPanel>
            <ChannelTabPanel value="8">About</ChannelTabPanel>
          </Box>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
};
