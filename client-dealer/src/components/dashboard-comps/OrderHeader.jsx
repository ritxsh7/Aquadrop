import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

const OrderHeader = () => {
  return (
    <Paper>
      <Stack
        direction="row"
        p="1rem"
        bgcolor="#202124"
        color="#fff"
        minWidth="650px"
      >
        <Typography variant="h6" fontSize="1rem" width="10%">
          Order ID
        </Typography>
        <Typography variant="h6" fontSize="1rem" width="25%" textAlign="center">
          User Details
        </Typography>
        <Typography variant="h6" fontSize="1rem" width="17%" textAlign="center">
          Bill Details
        </Typography>
        <Typography variant="h6" fontSize="1rem" width="17%" textAlign="center">
          Order details
        </Typography>
        <Typography variant="h6" fontSize="1rem" width="17%" textAlign="center">
          Order status
        </Typography>
        <Typography variant="h6" fontSize="1rem" width="17%" textAlign="center">
          Time Placed
        </Typography>
      </Stack>
    </Paper>
  );
};

export default OrderHeader;
