import React from "react";
import {
  OuterButtonShell,
  ButtonAnchor,
  ButtonHighlight,
  IconHolder,
  SideBarLabel,
} from "./Styling";
import { useNavigate } from "react-router-dom";

export const SidebarButton = (props) => {
  const { icon } = props;
  const navigate = useNavigate();

  return (
    <OuterButtonShell>
      <ButtonAnchor>
        <ButtonHighlight elevation={0}>
          <IconHolder onClick={() => navigate(icon[0])}>{icon[2]}</IconHolder>
          <SideBarLabel>{icon[1]}</SideBarLabel>
        </ButtonHighlight>
      </ButtonAnchor>
    </OuterButtonShell>
  );
};
