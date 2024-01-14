import React from "react";
import { menuConfigs } from "../../utils/configs/menuConfigs";
import logo from "../../assets/logo.png";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, toggleSidebar }) => {
  //========================DEFINING SIDEBAR=========================

  const sidebar = (
    <>
      <Stack
        direction="row"
        gap="1rem"
        alignItems="center"
        padding="1rem"
        sx={{ backgroundColor: "dodgerblue", color: "white" }}
      >
        <Box>
          <img src={logo} style={{ width: "1.4rem" }}></img>
        </Box>
        <Typography variant="h6">Aquadrop</Typography>
      </Stack>
      <List sx={{ width: "60vw", padding: "0 1rem" }}>
        {menuConfigs.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              padding: "0",
            }}
            component={NavLink}
            to={item.path}
            onClick={() => toggleSidebar(false)}
          >
            <ListItemIcon sx={{ minWidth: "auto", mr: "0.7rem" }}>
              <ion-icon name={item.icon}></ion-icon>
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={<Typography>{item.display}</Typography>}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          width: "300px",
          borderRight: "0px",
        },
      }}
    >
      {sidebar}
    </Drawer>
  );
};

export default Sidebar;
