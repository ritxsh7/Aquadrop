import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Divider,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../redux/features/dealer";

const StatsCard = ({ display, icon, getInfo, prefix }) => {
  const [numbers, setNumbers] = useState(0);
  const [aggregate, setAggregate] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrders = async () => {
      dispatch(toggleLoading(true));
      const { response, err } = await getInfo("650d7f98e6964ef181b1ceec");
      if (response) {
        setNumbers(response.number);
        setAggregate(response.aggregate);
      }
      if (err) console.log(err);
      dispatch(toggleLoading(false));
    };
    getOrders();
  }, [getInfo]);

  return (
    <Card sx={{ maxWidth: "400px", width: "100%", cursor: "pointer" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: "space-around", md: "space-between" }}
      >
        <Stack padding="1rem">
          <Typography color="secondary.dark">{display}</Typography>
          <Typography sx={{ fontSize: { xs: "1.5rem" } }}>
            {prefix && prefix} {numbers}+
          </Typography>
        </Stack>
        <Box>
          <img src={icon} alt={display} className="statscard-image"></img>
        </Box>
      </Stack>
      <Divider></Divider>
      {/* <CardContent sx={{ p: "0.5rem 1rem" }}>
        <Typography
          sx={{ ml: { xs: "2rem", md: "0" }, fontSize: { xs: "0.8rem" } }}
        >
          Overall {display} : {aggregate} +
        </Typography>
      </CardContent> */}
    </Card>
  );
};

export default StatsCard;
