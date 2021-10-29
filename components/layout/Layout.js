import { Menu } from "@mui/icons-material";
import {
  AppBar, Box,
  Button, IconButton, Toolbar,
  Typography
} from "@mui/material";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import Sidebar from "./sidebar/Sidebar";


const Layout = ({ children }) => {

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Fragment>
      {/* Navbar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="appbar" sx={{ bgcolor: "#fff" }} elevation={3}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpenSidebar(true)}
            >
              <Menu className="color--primary" />
            </IconButton>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
              className="color--primary"
            >
              <Link href="/">Class</Link>
            </Typography>
            <Button className="color--primary btn btn--primary">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Sidebar */}
      <Sidebar openSidebar={openSidebar} onOpen={() => setOpenSidebar(true)} onClose={() => setOpenSidebar(false)}/>

      <div className="page-layout p5">{children}</div>
    </Fragment>
  );
};

export default Layout;
