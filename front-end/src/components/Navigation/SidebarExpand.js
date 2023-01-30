import { Drawer } from "@mui/material";
import React from "react";

// pass a prop to this function and make that prop open and close this drawer (use true false to turn on off display css or change z-index css)
export const SidebarExpand = () => {
  return <Drawer variant="permanent"></Drawer>;
};
