import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Avatar, Menu, MenuItem } from "@mui/material";

import Avt from "../../../public/images/avatar-1.jpg";

export default function AvatarProfile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar
        aria-label="avatar"
        id="basic-avatar"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="appbar__avatar"
      >
        <Image src={Avt} alt="avatar" />
      </Avatar>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-avatar",
        }}
      >
        <MenuItem onClick={() => router.push('/classes/Teaching')}>Classes teaching</MenuItem>
        <MenuItem onClick={() => router.push('/classes/Enrolled')}>Classes enrolled</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
