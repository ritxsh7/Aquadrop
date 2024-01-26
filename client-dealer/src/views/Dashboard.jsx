import React, { useEffect } from "react";
import { Box, Container, Typography, Stack } from "@mui/material";
import statscards from "../utils/configs/statscards";
import StatsCard from "../components/dashboard-comps/StatsCard";
import OrdersChart from "../components/dashboard-comps/OrdersChart";
import EarningsChart from "../components/dashboard-comps/EarningsChart";
import HeaderText from "../components/dashboard-comps/HeaderText";

const Dashboard = () => {
  // ==============================STATES AND STORES===========================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#DFEEFF",
        margin: "0",
      }}
    >
      <Container sx={{ padding: "1.4rem 1rem" }}>
        <HeaderText bg="#fff">Your stats from the past month</HeaderText>

        <Stack gap="1rem" my="1rem" direction={{ xs: "column", md: "row" }}>
          {statscards.map((item, index) => (
            <StatsCard {...item} key={index} />
          ))}
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} gap="1rem">
          <OrdersChart />
          <EarningsChart />
        </Stack>
      </Container>
    </Box>
  );
};

export default Dashboard;
