import Chart from "chart.js/auto";

function createChart(
  type: "bar" | "doughnut",
  idChart: string,
  data: any,
  options?: any,
) {
  const canva = document.getElementById(idChart) as HTMLCanvasElement;

  const chart = new Chart(canva, {
    type,
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      ...options,
    },
  });

  canva.classList.remove("skeleton", "size-full");

  const updateChartDatasets = (data: any) => {
    chart.data.datasets = data;
    chart.update();
  };

  return { updateChartDatasets };
}

export default createChart;
