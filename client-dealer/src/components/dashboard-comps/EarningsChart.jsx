import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";

//components
import HeaderText from "./HeaderText";
import dashboard from "../../api/modules/dashboard";

const EarningsChart = () => {
  // ============================STATES AND STORES=================================
  const [earnings, setEarnings] = useState(null);

  //===============================CONFIGS AND DATA==============================
  const configs = {
    series: [
      {
        name: "Revenue (₹)",
        data: earnings?.map((earning) => earning.value),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      xaxis: {
        categories: earnings?.map((earning) => earning.date),
      },
      yaxis: {
        title: {
          text: "₹ ",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "Rs " + val;
          },
        },
      },
    },
  };

  useEffect(() => {
    const recentEarnings = async () => {
      const { response, err } = await dashboard.getRecentEarnings(
        "650d7f98e6964ef181b1ceec"
      );
      if (response) {
        setEarnings(response.result);
      }
      if (err) {
        console.log(err);
      }
    };
    recentEarnings();
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
        Your earnings
      </HeaderText>
      <ReactApexChart
        options={configs.options}
        series={configs.series}
        type="bar"
        height={350}
      />
    </Box>
  );
};

export default EarningsChart;
