import { Stack } from "@mui/material";
import { SideMenu, SideMiniButton, MiniIconLabel } from "./Styling";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "../../../contexts/SidebarContext";
import {MINI_SIDEBAR_BUTTONS} from "../../../utils/Constants";

export const SidebarMini = () => {
  const navigate = useNavigate();

  const { sideExpand, noMiniSideBar } = useContext(SidebarContext);

  return (
    <SideMenu sideExpand={sideExpand} noMiniSideBar={noMiniSideBar}>
      {MINI_SIDEBAR_BUTTONS.map((button) => {
        return (
          <SideMiniButton onClick={() => navigate(button.link)}>
            <Stack sx={{ alignItems: "center" }}>
              {button.icon}
              <MiniIconLabel>{button.label}</MiniIconLabel>
            </Stack>
          </SideMiniButton>
        );
      })}
    </SideMenu>
  );
};
