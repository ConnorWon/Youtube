import React from "react";
import { Box, Avatar, Typography, Button, styled } from "@mui/material";
import { colors } from "../../../ColorThemes";

const MainContainer = styled("div")`
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  flex-basis: 1e-9px;
`;

const ContentContainer = styled(Box)`
  max-width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ChannelIcon = styled(Avatar)`
  width: 103px;
  height: 103px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChannelName = styled(Typography)`
  color: ${colors.textWhite};
  margin: 4px 0;
  text-overflow: ellipsis;
  font-family: Roboto;
  font-size: 14px;
  font-height: 20px;
  font-weight: 500;
  overflow: hidden;
  display: block;
  max-height: 20px;
  -webkit-line-clamp: 1;
`;

const SubCount = styled(Typography)`
  color: ${colors.textWhite};
  font-family: Roboto;
  font-size: 12px;
  font-height: 18px;
  font-weight: 400;
  overflow: hidden;
  display: block;
  max-height: 18px;
  -webkit-line-clamp: 1;
`;

const SubscribeContainer = styled(Box)`
  margin-top: 16px;
`;

const Subscribe = styled(Button)`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: none;
  color: ${colors.textWhite};
  background-color: rgba(255, 255, 255, 0.1);
  height: 32px;
  padding: 0 12px;
  font-size: 12px;
  line-height: 32px;
  border-radius: 16px;
  font-weight: 500;
  text-transform: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  :hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export const ChannelContainer = () => {
  return (
    <MainContainer>
      <ContentContainer>
        <ChannelIcon />
        <ChannelName>Channel</ChannelName>
        <SubCount>81.7K subscribers</SubCount>
      </ContentContainer>
      <SubscribeContainer>
        <Subscribe>Subscribe</Subscribe>
      </SubscribeContainer>
    </MainContainer>
  );
};
