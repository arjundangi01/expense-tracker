import React, { useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
const Chart = () => {
  const { categoryTotals } = useSelector((store) => store.expenseReducer);
  const { rent, entertainment, food, transportation } = categoryTotals;
  const labels = ["Food", "Rent", "Transportation", "Entertainment"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Amount",
        data: [food, rent, transportation, entertainment],
        borderWidth: 1,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(205, 105, 86)",
        ],
        hoverOffset: 30,
      },
    ],
  });
  const options = {
    indexAxis: "x",
    config: {
      type: "pie",
      data: data,
    },
  };
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );
  return (
    <div
      className="w-[100%]  sm:w-[70%] lg:w-[65%] xl:w[55%] h-[400px]
      m-auto flex flex-col sm:flex-row "
    >
      <div className="w-[100%] sm:w-[70%] md:w-[60%]  flex justify-center">
        <Pie data={data} options={options} />
      </div>
      <div className=" w-[100%] sm:w-[30%] md:w-[40%] gap-2 flex flex-col justify-between">
        <div className="flex justify-between">
          <p className="font-bold border-b-2 border-b-[#ff6384]"> Food</p>
          <p> ₹ {food}</p>
        </div>

        <div className="flex justify-between">
          {" "}
          <p className="font-bold border-b-2 border-b-[#36a2eb]">Rent</p>
          <p> ₹ {rent}</p>
        </div>
        <div className="flex justify-between">
          {" "}
          <p className="font-bold border-b-2 border-b-[#ffcd56]">
            Transportation
          </p>
          <p> ₹ {transportation}</p>
        </div>
        <div className="flex justify-between">
          {" "}
          <p className="font-bold border-b-2 border-b-[#cd6956]">
            Entertainment
          </p>
          <p> ₹ {entertainment}</p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
