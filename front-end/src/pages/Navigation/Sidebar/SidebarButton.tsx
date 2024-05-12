import {
  OuterButtonShell,
  ButtonAnchor,
  ButtonHighlight,
  IconHolder,
  SideBarLabel,
} from "./Styling";
import { useNavigate } from "react-router-dom";
import {FC, ReactElement} from "react";
import { SvgIconProps} from "@mui/material";

export const SidebarButton: FC<{link: string, label: string, icon: ReactElement<SvgIconProps>}> = (props) => {
  const { link, label, icon } = props;
  const navigate = useNavigate();

  return (
    <OuterButtonShell onClick={() => navigate(link)}>
      <ButtonAnchor>
        <ButtonHighlight elevation={0}>
          <IconHolder>{icon}</IconHolder>
          <SideBarLabel>{label}</SideBarLabel>
        </ButtonHighlight>
      </ButtonAnchor>
    </OuterButtonShell>
  );
};
