import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box, styled } from "@mui/material";
import { SidebarContext } from "../contexts/SidebarContext";
import { GetWindowDimension } from "../utils/WindowSizeStore";

// Most Outer Container for the site
const Container = styled(Box)`
  height: calc(100% - 56px);
  position: relative;
  margin-top: 56px;
  overflow-x: clip;
  max-width: 100%;
`;

// Navbar component
export default function ContentContainer() {
  // used for tracking window size
  const windowSize = GetWindowDimension();

  // Sidebar related states
  const { sideExpand, inVideoPage } = useContext(SidebarContext);

  // deals with resizing the main page container
  useEffect(() => {
    const main = document.getElementById("main");
    if (inVideoPage || windowSize < 791) {
      main.style.width = "100%";
      main.style.marginLeft = "0";
    } else if (windowSize > 791 && (!sideExpand || windowSize <= 1312)) {
      main.style.width = "calc(100% - 72px)";
      main.style.marginLeft = "72px";
    } else if (windowSize > 1312 && sideExpand) {
      main.style.width = "calc(100% - 240px)";
      main.style.marginLeft = "240px";
    }
  }, [windowSize, sideExpand, inVideoPage]);

  return (
    <Container id="main">
      <Outlet />
    </Container>
  );
}
