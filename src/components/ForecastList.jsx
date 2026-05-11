function ForecastList({ forecast, convertTemp, unit }) {
  return (
    <div className="forecast">
      {forecast.map((day, index) => (
        <div key={index} className="forecast-card">
          <p className="forecast-day">
            {new Date(day.dt_txt).toLocaleDateString()}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
            alt={day.weather[0].description}
          />
          <p className="forecast-temp">
            {convertTemp(day.main.temp).toFixed(1)}°{unit}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ForecastList;
