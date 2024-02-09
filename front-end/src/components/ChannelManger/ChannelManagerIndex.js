import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { ChannelDashboard } from "./ChannelDashboard";
import { Stack, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colors } from "../../utils/ColorThemes";

const MainContainer = styled(Stack)`
  flex-direction: row;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #42a5f5;
  width: max-content;
  gap: 8px;
`;

const NavContainer = styled(Stack)`
  height: 100vh;
  padding: 32px;
  box-sizing: border-box;
  border-right: solid 1px ${colors.borderColor};
`;

export const ChannelManagerIndex = () => {
  return (
    <MainContainer direction="row">
      <NavContainer>
        <BackLink to={"/"}>
          <ArrowBackIcon />
          <span>Back to home</span>
        </BackLink>
      </NavContainer>
      <Routes>
        <Route path="" element={<ChannelDashboard />} />
      </Routes>
    </MainContainer>
  );
};
