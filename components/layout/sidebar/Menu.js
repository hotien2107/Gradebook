import { Class, School, Settings } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";

const Menu = ({ onClose }) => {
  const router = useRouter();

  return (
    <Box
      role="presentation"
      sx={{ width: 300 }}
      className="menu"
    >
      <School className="menu__home" onClick={() => router.push("/")} />

      <Divider />

      <p className="menu__subtitle">Teaching</p>

      <List>
        <ListItem
          button
          className="menu__item"
          onClick={() => router.push("/classes/Teaching")}
        >
          <ListItemIcon>
            <Class className="menu__icon menu__icon--1" />
          </ListItemIcon>
          <ListItemText primary="All Classes Teaching" />
        </ListItem>

        {/* {["Inbox", "Starred"].map((text, index) => (
          <ListItem button key={text} className="menu__item">
            <ListItemIcon>
              <span className="menu__icon menu__icon--2">{text[0]}</span>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>
      <Divider />
      <p className="menu__subtitle">Enrolled</p>

      <List>
        <ListItem
          button
          className="menu__item"
          onClick={() => router.push("/classes/Enrolled")}
        >
          <ListItemIcon>
            <Class className="menu__icon menu__icon--1" />
          </ListItemIcon>
          <ListItemText primary="All Classes Enrolled" />
        </ListItem>

        {/* {["Inbox", "Starred"].map((text, index) => (
          <ListItem button key={text} className="menu__item">
            <ListItemIcon>
              <span className="menu__icon menu__icon--2">{text[0]}</span>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>

      <Divider />
      <p className="menu__subtitle">Setting</p>
      <ListItem
        button
        className="menu__item"
        onClick={() => router.push("/classes/Teaching")}
      >
        <ListItemIcon>
          <Settings className="menu__icon menu__icon--1" />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </ListItem>
    </Box>
  );
};

export default Menu;
