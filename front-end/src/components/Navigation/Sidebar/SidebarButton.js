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
