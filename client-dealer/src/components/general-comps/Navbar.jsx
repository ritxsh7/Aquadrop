import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import Sidebar from "./Sidebar";
import { menuConfigs } from "../../utils/configs/menuConfigs";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";

export default function MenuAppBar() {
  const auth = useSelector((store) => store.dealer);

  const [open, setOpen] = useState(false);

  const toggleSideBar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSideBar}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Stack
            direction="row"
            gap="0.5rem"
            alignItems="center"
            sx={{ backgroundColor: "dodgerblue", color: "white" }}
          >
            <Box>
              <img src={logo} style={{ width: "1.4rem" }}></img>
            </Box>
            <Typography variant="h6">Aquadrop</Typography>
          </Stack>

          {/* ==================================NAVBAR FOR MOBILE DEVICES======================= */}
          <Sidebar open={open} toggleSidebar={toggleSideBar} />

          {/* ========================NAVBAR FOR MEDIUM SCREENS======================== */}
          <Stack direction="row" sx={{ ml: "auto", alignItems: "center" }}>
            <List sx={{ display: { xs: "none", md: "flex" } }}>
              {menuConfigs.map((item, index) => (
                <ListItemButton component={NavLink} to={item.path} key={index}>
                  <ListItemText sx={{ width: "max-content" }}>
                    {item.display}
                  </ListItemText>
                </ListItemButton>
              ))}
            </List>

            {auth.dealer ? (
              <Button variant="contained">
                {auth.dealer.name.split(" ")[0]}
              </Button>
            ) : (
              <Button
                variant="outlined"
                component={NavLink}
                to="/dealer/register"
                sx={{
                  backgroundColor: "white",
                  height: "2.5rem",
                  ":hover": { backgroundColor: "white", color: "#4b4b4b" },
                }}
              >
                Login
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
