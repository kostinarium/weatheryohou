import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function WeatherChart({ data }) {
    if (!data) return null;

    const labels = data.list.slice(0, 8).map((item) => item.dt_txt);
    const temps = data.list.slice(0, 8).map((item) => item.main.temp);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Temperature (°C)",
                data: temps,
                borderColor: "blue",
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    return <Line data={chartData} />;
}

export default WeatherChart;