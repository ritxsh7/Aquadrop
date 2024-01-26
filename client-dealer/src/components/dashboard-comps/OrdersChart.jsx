import { Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import dashboard from "../../api/modules/dashboard";
import { useEffect, useState } from "react";
import HeaderText from "./HeaderText";

const OrdersChart = () => {
  // ===========================STATES AND STORES===============================
  const [dates, setDates] = useState(null);
  const [qty, setQty] = useState(0);

  // =========================CONFIG FOR ORDERS CHART============================
  const currentDate = new Date();
  const firstDateOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDateOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const config = {
    series: [
      {
        name: "Jan",
        data: qty,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        min: firstDateOfMonth.getTime(),
        max: lastDateOfMonth.getTime(),
        type: "datetime",
        categories: dates,
      },
      yaxis: {
        min: 0,
        max: 10,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  //=======================GET ORDERS DATA FROM THE SERVER=======================
  useEffect(() => {
    const getThisMonthsOrders = async (id) => {
      try {
        const {
          response: { orderFilters },
          err,
        } = await dashboard.getRecentOrders(id);
        if (err) throw err;

        const datesArray = orderFilters.map((order) => order.timePlaced);
        const qtyArray = orderFilters.map((order) => order.quantity);
        setDates(datesArray);
        setQty(qtyArray);
      } catch (err) {
        console.log(err);
      }
    };
    getThisMonthsOrders("650d7f98e6964ef181b1ceec");
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "568px",
        backgroundColor: "#fff",
        borderRadius: "0.5rem",
      }}
    >
      <HeaderText text="#fff" bg="dodgerblue" noborder>
        This months' orders
      </HeaderText>
      <ReactApexChart
        options={config.options}
        series={config.series}
        type="area"
        height={350}
      />
    </Box>
  );
};

export default OrdersChart;
