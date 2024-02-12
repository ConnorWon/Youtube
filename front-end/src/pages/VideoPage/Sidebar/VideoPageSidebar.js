import React from "react";
import { VPSMainContainer, SidebarContainer, SidebarContents } from "./Styling";
import { SidebarVideo } from "./SidebarVideo";

// dummy data for videos
const videos = [1, 1, 1, 1, 1, 1, 1, 1, 1];

export const VideoPageSidebar = () => {
  return (
    <VPSMainContainer>
      <SidebarContainer>
        <SidebarContents>
          {videos.map(() => (
            <SidebarVideo />
          ))}
        </SidebarContents>
      </SidebarContainer>
    </VPSMainContainer>
  );
};
