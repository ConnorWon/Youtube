import React from "react";
import { ChannelBanner } from "./ChannelBanner";
import { ChannelHeader } from "./ChannelHeader";
import { ChannelNavBar } from "./ChannelNavBar";
import Banner from "./YouTube-banner.png";

export const Channel = (props) => {
  const { sideExpand } = props;

  return (
    <div>
      {Banner && <ChannelBanner banner={Banner} sideExpand={sideExpand} />}
      <ChannelHeader sideExpand={sideExpand} />
      <ChannelNavBar />
    </div>
  );
};
