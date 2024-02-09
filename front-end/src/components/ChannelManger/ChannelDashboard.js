import { Stack, Typography, styled } from "@mui/material";
import React from "react";
import { FormField } from "../Auth/FormField";
import { colors } from "../../utils/ColorThemes";
import "./Styling.css"

const MainContainer = styled(Stack)`
  width: 100%;
  align-items: start;
  gap: 16px;
`;

const HeaderText = styled(Typography)`
  font-size: 48px;
  color: white;
`;

const FieldLabel = styled(Typography)`
  font-size: 20px;
  color: white;
`;

const FieldsContainer = styled(Stack)`
  padding: 16px;
  gap: 16px;
  box-sizing: border-box;
  width: 100%;
  max-width: 876px;
`;

const HeaderContainer = styled(Stack)`
  border-bottom: solid 1px ${colors.borderColor};
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`;

export const ChannelDashboard = () => {
  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderText>Channel Info</HeaderText>
      </HeaderContainer>
      <FieldsContainer>
        <Stack className="FormFieldContainer">
          <FieldLabel>Name</FieldLabel>
          <FormField placeholder={"Enter Channel Name"}/>
        </Stack>
        <Stack className="FormFieldContainer">
          <FieldLabel>Tag</FieldLabel>
          <FormField placeholder={"Set Your Tag"}/>
        </Stack>
      </FieldsContainer>
    </MainContainer>
  );
};
