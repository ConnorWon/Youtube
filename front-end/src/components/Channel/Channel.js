import React from "react";
import { ChannelBanner } from "./ChannelBanner";
import { ChannelHeader } from "./ChannelHeader";
import { ChannelNavBar } from "./ChannelNavBar";
import Banner from "./YouTube-banner.png";

export const Channel = () => {
  return (
    <div>
      {Banner && <ChannelBanner banner={Banner} />}
      <ChannelHeader />
      <ChannelNavBar />
    </div>
  );
};
