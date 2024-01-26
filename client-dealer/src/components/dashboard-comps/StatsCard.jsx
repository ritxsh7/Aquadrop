import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const StatsCard = ({ display, icon, getInfo }) => {
  const [numbers, setNumbers] = useState(0);

  useEffect(() => {
    const getOrders = async () => {
      const { response, err } = await getInfo("650d7f98e6964ef181b1ceec");
      if (response) setNumbers(response.number);
      if (err) console.log(err);
    };
    getOrders();
  }, [getInfo]);

  return (
    <Card sx={{ maxWidth: "380px", width: "100%", cursor: "pointer" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: "space-around", md: "space-between" }}
      >
        <Stack padding="1rem">
          <Typography color="secondary.dark">{display}</Typography>
          <Typography sx={{ fontSize: { xs: "1.5rem" } }}>
            {numbers}+
          </Typography>
          <Typography variant="p" fontSize="small" color="limegreen">
            +12% increase
          </Typography>
        </Stack>
        <Box>
          <img src={icon} alt={display} className="statscard-image"></img>
        </Box>
      </Stack>
      <Divider></Divider>
      <CardContent sx={{ p: "0.8rem 1rem" }}>
        <Typography
          sx={{ ml: { xs: "2rem", md: "0" }, fontSize: { xs: "0.8rem" } }}
        >
          Overall {display} : 234 +
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
