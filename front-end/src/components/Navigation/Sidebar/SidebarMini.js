import { Stack } from "@mui/material";
import { SideMenu, SideMiniButton, MiniIconLabel } from "./Styling";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import { useNavigate } from "react-router-dom";

const icons = [
  ["/", "Home", <HomeOutlinedIcon />],
  ["/watch", "Shorts", <SlideshowIcon />],
  ["/results", "Subscriptions", <SubscriptionsOutlinedIcon />],
  ["/channel", "Library", <VideoLibraryOutlinedIcon />],
];

export const SidebarMini = (props) => {
  const navigate = useNavigate();

  const { sideExpand, inVideoPage } = props;

  return (
    <SideMenu sideExpand={sideExpand} inVideoPage={inVideoPage}>
      {icons.map((icon) => {
        return (
          <SideMiniButton onClick={() => navigate(icon[0])}>
            <Stack sx={{ alignItems: "center" }}>
              {icon[2]}
              <MiniIconLabel>{icon[1]}</MiniIconLabel>
            </Stack>
          </SideMiniButton>
        );
      })}
    </SideMenu>
  );
};
