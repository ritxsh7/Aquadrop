import React from "react";
import { Typography } from "@mui/material";

const HeaderText = ({ text, bg, noborder, children }) => {
  return (
    <Typography
      variant="h1"
      color="primary.dark"
      textAlign="center"
      sx={{
        color: text || "#0195FF",
        fontSize: { xs: "1.2rem", md: "1.5rem" },
        backgroundColor: bg,
        p: "1rem",
        mb: "1rem",
        borderRadius: noborder ? "0" : "0.4rem",
      }}
    >
      {children}
    </Typography>
  );
};

export default HeaderText;
