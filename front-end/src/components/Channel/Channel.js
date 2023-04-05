import React, { useEffect } from "react";
import { ChannelBanner } from "./ChannelBanner";
import { ChannelHeader } from "./ChannelHeader";
import { ChannelNavBar } from "./ChannelNavBar";
import Banner from "./YouTube-banner.png";

export const Channel = (props) => {
  const { sideExpand, setModalSideExpand } = props;

  // used to close modal sidebar after switching to this page from another
  useEffect(() => {
    setModalSideExpand(false);
  }, []);

  return (
    <div>
      {Banner && <ChannelBanner banner={Banner} sideExpand={sideExpand} />}
      <ChannelHeader sideExpand={sideExpand} />
      <ChannelNavBar sideExpand={sideExpand} />
    </div>
  );
};
