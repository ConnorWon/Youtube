import { Stack, Button, styled, Typography } from "@mui/material";
import { colors } from "./ColorThemes";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SlideshowIcon from "@mui/icons-material/Slideshow";

const SideMenu = styled(Stack)`
  height: 100%;
  width: 72px;
  position: fixed;
  top: 56px;
  left: 0;
  z-index: 1;
  background-color: ${colors.bgColorDark};
  overflow-x: hidden;
  padding-top: 20px;
`;

const SideButton = styled(Button)`
  color: white;
  text-transform: none;
  height: 74px;
  border-radius: 0px;
  :hover {
    box-shadow: inset 0 0 0 10em rgba(255, 255, 255, 0.1);
  },
`;

const Label = styled(Typography)`
  font-size: 10px;
  margin-top: 5px;
`;

const icons = [
  ["Home", <HomeOutlinedIcon />],
  ["Explore", <ExploreOutlinedIcon />],
  ["Shorts", <SlideshowIcon />],
  ["Subscriptions", <SubscriptionsOutlinedIcon />],
  ["Library", <VideoLibraryIcon />],
];

export const Sidebar = () => {
  return (
    <SideMenu sx={{ padding: "0px" }}>
      {icons.map((icon) => {
        return (
          <SideButton>
            <Stack sx={{ alignItems: "center" }}>
              {icon[1]}
              <Label>{icon[0]}</Label>
            </Stack>
          </SideButton>
        );
      })}
    </SideMenu>
  );
};
