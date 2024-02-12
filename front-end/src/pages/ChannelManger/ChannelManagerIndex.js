import React from "react";
import { Route, Routes } from "react-router-dom";
import { ChannelDashboard } from "./ChannelDashboard";
import { Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BackLink, NavContainer } from "./Styling";

export const ChannelManagerIndex = () => {
  return (
    <Stack direction="row">
      <NavContainer>
        <BackLink to={"/"}>
          <ArrowBackIcon />
          <span>Back to home</span>
        </BackLink>
      </NavContainer>
      <Routes>
        <Route path="" element={<ChannelDashboard />} />
      </Routes>
    </Stack>
  );
};
