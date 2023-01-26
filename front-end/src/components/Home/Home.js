import React from "react";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Box, Tab, styled, ThemeProvider } from "@mui/material";
import { HomeTabs } from "./HomeTabs";

export const Home = () => {
  return (
    <div>
      <HomeTabs />
      <Box>
        {/* take data from back-end then provide the necessary params for each individual video box */}
      </Box>
    </div>
  );
};
