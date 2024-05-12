import { TabContext, TabList } from "@mui/lab";
import {Box, ThemeProvider} from "@mui/material";
import {FC, useEffect, useState} from "react";
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
import {CHANNEL_TAB_ROUTES} from "../../utils/Constants";

export const ChannelNavBar: FC<{sideExpand: boolean, tag: string}> = (props) => {
  const { sideExpand, tag } = props;

  let currentURL = window.location.href.split("/");
  const prevPath = "/channel/" + tag;

  // used to ensure tab indicator is underlining correct tab
  const defaultState = () => {
    if (currentURL.length === 5) {
      return prevPath;
    } else {
      return prevPath + "/" + currentURL[currentURL.length - 1];
    }
  };

  // state used to track tab
  const [value, setValue] = useState<string>(defaultState);

  useEffect(() => {
    setValue(defaultState());
  }, [tag]);

  // handles changing of tabs
  const handleChange = (_event: any, newValue: string) => {
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
              {CHANNEL_TAB_ROUTES.map((tabRoutes) => (
                <ChannelTab
                  label={tabRoutes[1]}
                  value={prevPath + tabRoutes[0]}
                  component={Link}
                  to={prevPath + tabRoutes[0]}
                />
              ))}
            </TabList>
          </TabContainer>
          <ChannelTabPanel>
            <Routes>
              <Route path="" element={<Home sideExpand={sideExpand} />} />
              <Route path="/videos" element={<Videos sideExpand={sideExpand} />} />
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/live" element={<Videos sideExpand={sideExpand} />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/community" element={<Community />} />
              <Route path="/channels" element={<Channels />} />
              <Route path="/about" element={<About sideExpand={sideExpand} />} />
            </Routes>
          </ChannelTabPanel>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
};
