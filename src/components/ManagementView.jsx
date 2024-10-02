import "../styles/ManagementView.scss";
import { useEffect } from "react";
import { useBeerStore } from "../store/beerStore";
import ReactApexChart from "react-apexcharts";
import AddNewBeer from "./AddNewBeer";

const ManagementView = () => {
  const getTop10RatedBeerBrands = useBeerStore(
    (state) => state.getTopRatedBeerBrands
  );
  const top10RatedBeerBrands = useBeerStore(
    (state) => state.top10RatedBeerBrands
  );

  useEffect(() => {
    getTop10RatedBeerBrands();
  }, []);

  const chartOptions = {
    chart: {
      width: "100%",
      height: 380,
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    series: [
      {
        name: "reviews",
        data: top10RatedBeerBrands.map((beer) => beer.rating.reviews),
      },
    ],
    xaxis: {
      categories: top10RatedBeerBrands.map((beer) => beer.brand),
    },
    legend: {
      position: "right",
      verticalAlign: "top",
      containerMargin: {
        left: 35,
        right: 60,
      },
    },
    colors: ["#292566", "#292566", "#292566"],
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="management-view">
      <h1>Top 10 sold beer brands</h1>
      <div className="chart">
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          height={380}
        />
      </div>
      <AddNewBeer />
    </div>
  );
};

export default ManagementView;
