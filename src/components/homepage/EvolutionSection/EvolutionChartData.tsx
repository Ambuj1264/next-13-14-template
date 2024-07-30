import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
Chart.register(
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

Chart.register(ArcElement);
interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

const EvolutionChartData = ({ data }: { data: ChartData }) => {
  const deafult = {
    labels: ["Walid Amarir", "Samuel Alonso", "Ferré", "Mencia Jornet"],
    datasets: [
      {
        data: [30, 40, 30, 30],
        backgroundColor: ["#0277B6", "#67D64B", "#D64B4B", "#B3D000"],
      },
    ],
  };

  const options: any = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 1,
  };
  return (
    <Pie data={data || deafult} options={options} width={200} height={200} />
  );
};

export default EvolutionChartData;
