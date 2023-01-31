import { Drawer, Stack, styled } from "@mui/material";
import React from "react";
import {
  ButtonAnchor,
  ButtonHighlight,
  HeaderSpacer,
  IconHolder,
  InnerSidebarContainer,
  OuterButtonShell,
  SidebarContainer,
  SideBarLabel,
} from "./Styling";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

// pass a prop to this function and make that prop open and close this drawer (use true false to turn on off display css or change z-index css)
export const SidebarExpand = () => {
  const MBContainer = styled(Stack)``;
  const OuterMBContainer = styled(Stack)`
    padding: 12px;
  `;

  return (
    <Drawer variant="permanent">
      <HeaderSpacer />
      <SidebarContainer>
        <InnerSidebarContainer>
          <OuterMBContainer>
            <MBContainer>
              <OuterButtonShell>
                <ButtonAnchor>
                  <ButtonHighlight>
                    <IconHolder>
                      <HomeOutlinedIcon />
                    </IconHolder>
                    <SideBarLabel>Home</SideBarLabel>
                  </ButtonHighlight>
                </ButtonAnchor>
              </OuterButtonShell>
            </MBContainer>
          </OuterMBContainer>
        </InnerSidebarContainer>
      </SidebarContainer>
    </Drawer>
  );
};
