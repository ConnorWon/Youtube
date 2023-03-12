import React from "react";
import { Stack, styled } from "@mui/material";
import { SidebarVideo } from "./SidebarVideo";

const MainContainer = styled(Stack)``;

const SidebarContainer = styled(Stack)``;

const SidebarContents = styled("div")`
  --item-margin: 8px;
  --item-width: calc(var(--sidebar-width) / 3);
  --thumbnail-height: calc(var(--sidebar-width) / 3 / 9 * 16);
`;

const videos = [1, 1, 1, 1, 1, 1, 1, 1, 1];

export const VideoPageSidebar = () => {
  return (
    <MainContainer>
      <SidebarContainer>
        <SidebarContents>
          {videos.map(() => (
            <SidebarVideo />
          ))}
        </SidebarContents>
      </SidebarContainer>
    </MainContainer>
  );
};
