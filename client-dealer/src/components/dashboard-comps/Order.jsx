import { Box, Paper, Stack, Button, Typography, Dialog } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import pending from "../../assets/pending.png";
import dashboard from "../../api/modules/dashboard";
import { toggleLoading } from "../../redux/features/dealer";

const Order = ({ _id, totalQty, totalAmount, timePlaced, userId, status }) => {
  const { loading } = useSelector((store) => store.dealer);
  const dispatch = useDispatch();
  const date = new Date(timePlaced);
  const [open, setOpen] = useState(false);

  const approveOrder = async () => {
    setOpen(false);
    dispatch(toggleLoading(true));
    const { response, err } = await dashboard.approveOrder(_id);
    if (response) {
      window.location.reload();
    }
    if (err) alert(err);
    dispatch(toggleLoading(false));
  };

  return (
    <Paper sx={{ p: "1rem", my: "1rem" }}>
      {loading ? (
        <Box height="3rem" bgcolor="lightgray"></Box>
      ) : (
        <Stack direction="row" alignItems="center">
          <Typography width="10%">{_id.slice(-5)}</Typography>
          <Box width="25%" textAlign="center">
            <Typography fontWeight="600" color="# 4b4b4b">
              {userId.name}
            </Typography>
            <Typography fontWeight="300" fontSize="small">
              {userId.email}
            </Typography>
          </Box>
          <Box width="17%" textAlign="center">
            <Typography fontWeight="600" color="#4b4b4b">
              Price : ₹{totalAmount}
            </Typography>
            <Typography fontWeight="300" fontSize="small">
              Qty : {totalQty}
            </Typography>
          </Box>
          <Typography width="17%" textAlign="center" color="primary">
            <NavLink>View Order</NavLink>
          </Typography>
          <Box width="17%" textAlign="center">
            {status ? (
              <Button variant="contained" color="success">
                Paid
              </Button>
            ) : (
              <Button
                variant="contained"
                color="warning"
                onClick={() => setOpen(true)}
              >
                Due
              </Button>
            )}
          </Box>
          <Stack width="17%" alignItems="center">
            <Typography textAlign="center">
              {date.toString().slice(4, 16)}
            </Typography>
            <Typography fontWeight="300" fontSize="small">
              {date.toLocaleString().slice(11)}
            </Typography>
          </Stack>
          <Dialog open={open}>
            <Stack alignItems="center" sx={{ p: "1rem" }} gap="1rem">
              <Box
                component="img"
                src={pending}
                height="6rem"
                width="6rem"
              ></Box>
              <Typography>Are you sure to approve this order ?</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={approveOrder}
              >
                Approve
              </Button>
            </Stack>
          </Dialog>
        </Stack>
      )}
    </Paper>
  );
};

export default Order;
