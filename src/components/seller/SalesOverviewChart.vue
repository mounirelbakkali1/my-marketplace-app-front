<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "sales overview chart",
  components: { Bar },
  data() {},
  computed: {
    chartData() {
      const labels = ["December", "January", "February"];
      return {
        labels: labels,
        datasets: [
          {
            label: "Sales on " + labels[0],
            data: [40, 20, 12],
            backgroundColor: ["#acffaf", "#cae7ff", "#ffdfb1"],
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
      };
    },
  },
};
</script>
