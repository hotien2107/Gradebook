import { Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import AvatarProfile from "./AvatarProfile";

const Appbar = ({ openSidebarHandle }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="appbar" sx={{ bgcolor: "#fff" }} elevation={3}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openSidebarHandle}
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
          {/* <Button className="color--primary btn btn--primary">Login</Button> */}
          {/* Avatar group */}
          <AvatarProfile />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
