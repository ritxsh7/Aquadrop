import React, { useEffect, useState } from "react";
import HeaderText from "./HeaderText";
import Order from "./Order";
import OrderHeader from "./OrderHeader";
import { Box, Pagination, Stack, Paper } from "@mui/material";
import dashboard from "../../api/modules/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../../redux/features/dealer";

const InvoiceList = () => {
  const { loading } = useSelector((store) => store.dealer);
  const dispatch = useDispatch();
  const [invoices, setInvoices] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const getInvoices = async () => {
      dispatch(toggleLoading(true));
      const { response, err } = await dashboard.getAllOrders(
        "650d7f98e6964ef181b1ceec",
        page
      );
      if (response) {
        setInvoices(response.orders);
        setCount(Math.floor(response.count / 3));
      }
      if (err) {
        alert(err);
      }
      dispatch(toggleLoading(false));
    };
    getInvoices();
  }, [page]);

  return (
    <Box my="1rem" width="100%">
      <HeaderText bg="dodgerblue" text="#fff">
        Recent transactions
      </HeaderText>
      <Box sx={{ overflowX: "scroll" }}>
        <OrderHeader />
        <Stack className="dashboard-transactions">
          {invoices?.map((item) => (
            <Order {...item} key={item._id} />
          ))}
        </Stack>
      </Box>
      <Paper width="100%">
        <Pagination
          count={count}
          color="primary"
          sx={{
            p: "1rem",
            "& .MuiPagination-ul": {
              justifyContent: "center",
            },
          }}
          onChange={handleChange}
        />
      </Paper>
    </Box>
  );
};

export default InvoiceList;
