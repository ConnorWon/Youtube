import React from "react";
import {
  CCMainContainer,
  CCContentContainer,
  ChannelIcon,
  ChannelName,
  SubCount,
  Subscribe,
  SubscribeContainer,
} from "./Styling";

export const ChannelContainer = () => {
  return (
    <CCMainContainer>
      <CCContentContainer>
        <ChannelIcon />
        <ChannelName>Channel</ChannelName>
        <SubCount>81.7K subscribers</SubCount>
      </CCContentContainer>
      <SubscribeContainer>
        <Subscribe>Subscribe</Subscribe>
      </SubscribeContainer>
    </CCMainContainer>
  );
};
