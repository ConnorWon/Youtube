import { VPSMainContainer, SidebarContainer, SidebarContents } from "./Styling";
import { SidebarVideo } from "./SidebarVideo";
import {DUMMY_VIDEOS} from "../../../utils/Constants";


export const VideoPageSidebar = () => {
  return (
    <VPSMainContainer>
      <SidebarContainer>
        <SidebarContents>
          {DUMMY_VIDEOS.map(() => (
            <SidebarVideo />
          ))}
        </SidebarContents>
      </SidebarContainer>
    </VPSMainContainer>
  );
};
