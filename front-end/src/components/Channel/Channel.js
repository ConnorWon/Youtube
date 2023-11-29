import React, { useContext, useEffect } from "react";
import { ChannelBanner } from "./ChannelBanner";
import { ChannelHeader } from "./ChannelHeader";
import { ChannelNavBar } from "./ChannelNavBar";
import Banner from "./YouTube-banner.png";
import { SidebarContext } from "../../contexts/SidebarContext";

export const Channel = () => {
  const { sideExpand, setModalSideExpand } = useContext(SidebarContext);

  // used to close modal sidebar after switching to this page from another
  useEffect(() => {
    setModalSideExpand(false);
  }, []);

  return (
    <>
      {Banner && <ChannelBanner banner={Banner} sideExpand={sideExpand} />}
      <ChannelHeader sideExpand={sideExpand} />
      <ChannelNavBar sideExpand={sideExpand} />
    </>
  );
};
