function Forecast({ data }) {
    if (!data) return <p>No data available</p>;

    const dailyForecasts = {};

    // Группируем данные по дням и выбираем прогноз на 12:00
    data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0]; // YYYY-MM-DD
        if (!dailyForecasts[date] && item.dt_txt.includes("12:00:00")) {
            dailyForecasts[date] = item;
        }
    });

    const days = Object.keys(dailyForecasts).slice(1, 3); // Завтра и послезавтра

    return (
        <div>
            <h2>Forecast for the next 2 days</h2>
            {days.map((day) => (
                <div key={day}>
                    <h3>{day}</h3>
                    <p>Temperature: {dailyForecasts[day].main.temp}°C</p>
                </div>
            ))}
        </div>
    );
}

export default Forecast;