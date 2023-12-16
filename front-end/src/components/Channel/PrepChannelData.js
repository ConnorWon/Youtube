import React from "react";
import { ViewedChannelContextProvider } from "../../contexts/ViewedChannelContext";
import { Channel } from "./Channel";

export const PrepChannelData = () => {
  return (
    <ViewedChannelContextProvider>
      <Channel />
    </ViewedChannelContextProvider>
  );
};
