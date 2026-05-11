import dayjs from "dayjs";
import humidityImage from "../assets/images/humidity.svg";
import windImage from "../assets/images/wind.svg";
import pressureImage from "../assets/images/pressure.svg";
import visibilityImage from "../assets/images/visibility.svg";
import minTempImage from "../assets/images/temperature.svg";
import maxTempImage from "../assets/images/temperature.svg";
import sunriseImage from "../assets/images/sunrise.svg";
import sunsetImage from "../assets/images/sunset.svg";

function WeatherInfo({ weather, unit, time, convertTemp }) {
  if (!weather?.main) return null;

  const sunriseTime = dayjs(weather.sys.sunrise * 1000).format("hh:mm A");
  const sunsetTime = dayjs(weather.sys.sunset * 1000).format("hh:mm A");

  return (
    <div className="weather-info p-3 mt-4 mx-3 rounded-3">
      <div className="info-1">
        <div>
          <h2 className="fs-4 fw-bold">
            {weather.name},{" "}
            {weather.sys.country === "NG" ? "NG 🇳🇬" : weather.sys.country}
          </h2>
          <p className="date">{time}</p>
        </div>

        <div className="d-flex align-items-center mt-3 gap-3">
          <div className="d-flex align-items-center gap-2">
            <img
              height={70}
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />

            <div className="degree">
              <p>
                {convertTemp(Math.ceil(weather.main.temp))}°{unit}
              </p>
              <p>
                Feels like {convertTemp(Math.ceil(weather.main.feels_like))}°
                {unit}
              </p>
            </div>
          </div>

          <p className="ms-auto overcast-cloud py-2 px-3 rounded-2">
            {weather.weather[0].description}
          </p>
        </div>
      </div>

      <hr />

      <div className="row mt-3">
        <div className="col-6 col-md-6 d-grid gap-3">
          <div className="humidity d-flex align-items-center gap-2">
            <img height={20} src={humidityImage} alt="Humidity" />
            <div className="weather-component">
              <p>Humidity</p>
              <p>{weather.main.humidity}%</p>
            </div>
          </div>

          <div className="Wind-Speed d-flex align-items-center gap-2">
            <img height={20} src={windImage} alt="Wind Speed" />
            <div className="weather-component">
              <p>Wind Speed</p>
              <p>{weather.wind.speed} m/s</p>
            </div>
          </div>

          <div className="Pressure d-flex align-items-center gap-2">
            <img height={20} src={pressureImage} alt="Pressure" />
            <div className="weather-component">
              <p>Pressure</p>
              <p>{weather.main.pressure} hPa</p>
            </div>
          </div>

          <div className="sun-time d-flex align-items-center gap-2">
            <img
              height={20}
              src={sunriseImage}
              alt="Sunrise"
              className="sun-icon sunrise"
            />
            <div className="weather-component">
              <p>Sunrise</p>
              <p>{sunriseTime}</p>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-6 d-grid gap-3">
          <div className="Visibility d-flex align-items-center gap-2">
            <img height={20} src={visibilityImage} alt="Visibility" />
            <div className="weather-component">
              <p>Visibility</p>
              <p>{(weather.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>

          <div className="Min-Temp d-flex align-items-center gap-2">
            <img height={20} src={minTempImage} alt="Min Temp" />
            <div className="weather-component">
              <p>Min Temp</p>
              <p>
                {convertTemp(weather.main.temp_min).toFixed(1)} °{unit}
              </p>
            </div>
          </div>

          <div className="Max-Temp d-flex align-items-center gap-2">
            <img height={20} src={maxTempImage} alt="Max Temp" />
            <div className="weather-component">
              <p>Max Temp</p>
              <p>
                {convertTemp(weather.main.temp_max).toFixed(1)} °{unit}
              </p>
            </div>
          </div>

          <div className="sun-time d-flex align-items-center gap-2">
            <img
              height={20}
              src={sunsetImage}
              alt="Sunset"
              className="sun-icon sunset"
            />
            <div className="weather-component">
              <p>Sunset</p>
              <p>{sunsetTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
