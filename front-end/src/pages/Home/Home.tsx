import {SyntheticEvent, useContext, useEffect, useState} from "react";
import {
  TabContainer,
  HomeTab,
  HomeTabPanel,
  HomeTabPanelContainer,
  VideoGrid,
  VideoOuterContainer,
} from "./Styling";
import { TabContext, TabList } from "@mui/lab";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../utils/ColorThemes";
import { VideoContainer } from "../../components/VerticalVideoContainer";
import { SidebarContext } from "../../contexts/SidebarContext";
import {DUMMY_HOME_TAB_OPTIONS, DUMMY_VIDEOS} from "../../utils/Constants";

export const Home = () => {
  // tracks which video tab user is in
  const [value, setValue] = useState<string>("0");
  // handles changing of tab
  const handleChange = (_event: SyntheticEvent<Element, Event>, newValue: string) => {
    setValue(newValue);
  };

  const { setModalSideExpand } = useContext(SidebarContext);

  // used to close modal sidebar after switching to this page from another
  useEffect(() => {
    setModalSideExpand(false);
  }, []);

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
            {DUMMY_HOME_TAB_OPTIONS.map((tab, index) => (
              <HomeTab label={tab} value={(index).toString()} />
            ))}
          </TabList>
        </TabContainer>
        <HomeTabPanelContainer>
          {DUMMY_HOME_TAB_OPTIONS.map((_value, index) => (
            <HomeTabPanel value={(index).toString()}>
              <VideoGrid container spacing={0}>
                {DUMMY_VIDEOS.map(() => (
                  <VideoOuterContainer item>
                    <VideoContainer inChannelHome={false} inChannel={false}/>
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
