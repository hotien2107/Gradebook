import { SwipeableDrawer } from "@mui/material";
import React from "react";
import Menu from "./Menu";


const Sidebar = ({ onOpen, onClose, openSidebar }) => {
  return (
    <SwipeableDrawer open={openSidebar} onClose={onClose} onOpen={onOpen}>
      <Menu onClose={onClose} onOpen={onOpen} />
    </SwipeableDrawer>
  );
};

export default Sidebar;
