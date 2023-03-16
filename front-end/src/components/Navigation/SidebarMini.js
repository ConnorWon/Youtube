import { Stack, Button, styled, Typography } from "@mui/material";
import { colors } from "../ColorThemes";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import { useNavigate } from "react-router-dom";

const SideMenu = styled(Stack)`
  height: 100%;
  width: 72px;
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 0;
  background-color: ${colors.bgColorDark};
  overflow-x: hidden;
  margin-top: 56px;
  visibility: ${({ sideExpand, inVideoPage }) =>
    sideExpand || inVideoPage ? "hidden" : "visible"};

  @media only screen and (max-width: 791px) {
    visibility: ${({ inSearchPage }) => (inSearchPage ? "hidden" : "visible")};
  }
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
  ["/", "Home", <HomeOutlinedIcon />],
  ["/watch", "Shorts", <SlideshowIcon />],
  ["/results", "Subscriptions", <SubscriptionsOutlinedIcon />],
  ["/channel", "Library", <VideoLibraryOutlinedIcon />],
];

export const SidebarMini = (props) => {
  const navigate = useNavigate();

  const { inSearchPage, sideExpand, inVideoPage } = props;

  return (
    <SideMenu
      inSearchPage={inSearchPage}
      sideExpand={sideExpand}
      inVideoPage={inVideoPage}
    >
      {icons.map((icon) => {
        return (
          <SideButton onClick={() => navigate(icon[0])}>
            <Stack sx={{ alignItems: "center" }}>
              {icon[2]}
              <Label>{icon[1]}</Label>
            </Stack>
          </SideButton>
        );
      })}
    </SideMenu>
  );
};
