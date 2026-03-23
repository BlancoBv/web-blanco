import Chart from "chart.js/auto";

function createChart(
  type: "bar" | "doughnut",
  idChart: string,
  data: any,
  options?: any,
) {
  const canva = document.getElementById(idChart) as HTMLCanvasElement;

  const plugin = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart: any, _args: any, options: any) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#ffffff";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  const chart = new Chart(canva, {
    type,
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      ...options,
    },
    plugins: [plugin],
  });

  canva.classList.remove("skeleton", "size-full");

  const updateChartDatasets = (data: any) => {
    chart.data.datasets = data;
    chart.update();
  };

  const resize = () => {
    chart.resize();
  };

  return {
    updateChartDatasets,
    resize,
  };
}

export default createChart;
