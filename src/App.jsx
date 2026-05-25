import { useReducer, useEffect } from "react";
import {
  setState,
  setWeather,
  setForecast,
  setError,
  setLoading,
  setLastCity,
  switchUnit,
  setBackground,
} from "./utils/action";
import WeatherInfo from "./components/WeatherInfo";
import ForecastList from "./components/ForecastList";
import EmptyState from "./components/EmptyState";
import WeatherInfoSkeleton from "./components/WeatherInfoSkeleton";
import ForecastSkeleton from "./components/ForecastSkeleton";
import { weatherReducer, initialState } from "./utils/useReducer";
import dayjs from "dayjs";

import searchImage from "./assets/images/search (2).png";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  useEffect(() => {
    const classes = [
      "bg-default",
      "bg-clear",
      "bg-clouds",
      "bg-rain",
      "bg-snow",
      "bg-thunderstorm",
      "bg-mist",
      "bg-drizzle",
      "bg-haze",
    ];

    document.body.classList.remove(...classes);
    document.body.classList.add(state.background || "bg-default");

    return () => document.body.classList.remove(...classes);
  }, [state.background]);

  const date = dayjs();

  const time = date.format("dddd, MMMM D, YYYY");

  const getBackgroundClass = (condition) => {
    switch (condition) {
      case "clear":
        return "bg-clear";
      case "clouds":
        return "bg-clouds";
      case "rain":
      case "drizzle":
        return "bg-rain";
      case "snow":
        return "bg-snow";
      case "thunderstorm":
        return "bg-thunderstorm";
      case "mist":
      case "haze":
      case "fog":
        return "bg-mist";
      default:
        return "bg-default";
    }
  };

  const updateBackground = (condition) => {
    setBackground(dispatch, getBackgroundClass(condition));
  };

  function handleSubmit(event) {
    setState(dispatch, event.target.value);
  }

  const fetchWeather = async () => {
    if (!state.states.trim()) {
      dispatch({ type: "SET_ERROR", payload: "Please enter a valid state" });
      setError(dispatch, "Please enter a valid state");
      return;
    }

    setLoading(dispatch, true);
    setError(dispatch, "");

    try {
      const query = encodeURIComponent(state.states);
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const [response1, response2] = await Promise.all([
        fetch(`${apiUrl}/weather?city=${query}`),
        fetch(`${apiUrl}/forecast?city=${query}`),
      ]);

      if (!response1.ok || !response2.ok) {
        const errMsg = !response1.ok
          ? "Weather data unavailable"
          : "Forecast data unavailable";
        setError(dispatch, errMsg);
        setWeather(dispatch, null);
        setForecast(dispatch, null);
        return;
      }

      const data1 = await response1.json();
      const data2 = await response2.json();

      const daily = Array.isArray(data2.list)
        ? data2.list.filter((entry) => entry.dt_txt.includes("12:00:00"))
        : [];

      setWeather(dispatch, data1);
      setForecast(dispatch, daily);
      setLastCity(dispatch, state.states);

      const condition = data1.weather?.[0]?.main?.toLowerCase() || "default";
      updateBackground(condition);
    } catch (err) {
      setError(dispatch, err.message || "Something went wrong");
      setWeather(dispatch, null);
      setForecast(dispatch, null);
    } finally {
      setLoading(dispatch, false);
    }
  };

  const refreshPage = async () => {
    if (!state.lastCity) return;
    setLoading(dispatch, true);

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(state.lastCity)}`,
      );
      const data = await response.json();
      setWeather(dispatch, data);

      const condition = data.weather?.[0]?.main?.toLowerCase() || "default";
      updateBackground(condition);
    } catch (error) {
      setError(dispatch, error || "Unable to refresh");
    }

    setLoading(dispatch, false);
  };

  function pressEnter(event) {
    if (event.key === "Enter") {
      fetchWeather();
    }
  }

  //Temperature conversion
  const convertTemp = (temp) => {
    if (state.unit === "C") return temp;
    return (temp * 9) / 5 + 32;
  };

  function switchTemp() {
    switchUnit(dispatch);
  }

  return (
    <div className="App container-xl mx-md-auto">
      <header className="app-header">
        <h1 className="app-title fw-bold text-center mt-4">Weather Station</h1>
      </header>

      <p className="info-city fs-6 text-center">
        Get real-time weather information for any city
      </p>

      <div className="row gap-1 px-3 mt-5 d-flex justify-content-center ">
        <input
          className=" py-1 px-2 rounded-2  col-6"
          type="search"
          name="state"
          id="state"
          value={state.states}
          placeholder="Enter city or state..."
          onChange={handleSubmit}
          onKeyDown={pressEnter}
        />

        <button
          className="search-button col-2 d-flex bg-black rounded-2 align-items-center justify-content-center"
          onClick={fetchWeather}
        >
          <img height={20} src={searchImage} alt="search" />
        </button>
        <button className="refresh-button rounded-2" onClick={refreshPage}>
          Refresh
        </button>
      </div>

      <div className="controls d-flex align-items-center justify-content-center gap-3 mt-3">
        <button
          onClick={switchTemp}
          className={`temp-switch ${state.unit === "C" ? "active-c" : "active-f"}`}
        >
          <span className="switch-label">°C</span>
          <span className="switch-icon">⇄</span>
          <span className="switch-label">°F</span>
        </button>
        <div className="popular d-flex align-items-center gap-2">
          <label htmlFor="states" className="popular-label">
            Popular State:{" "}
          </label>
          <select
            name="states"
            id="states"
            className="popular-select"
            onChange={(e) => setState(dispatch, e.target.value)}
          >
            <option value="">Select state</option>
            <option value="Osun">Osun</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Oyo">Oyo</option>
            <option value="Ondo State">Ondo State</option>
          </select>
        </div>
      </div>

      {state.loading && (
        <>
          <WeatherInfoSkeleton />
          <ForecastSkeleton />
        </>
      )}

      {!state.loading && state.error && (
        <div className="error-page   my-5 p-4  d-flex flex-column align-items-center text-center" role="alert">
          <div className="error-icon mb-3" aria-hidden="true">⚠️</div>
          <h3 className="error-heading mb-2">Oops! Something went wrong</h3>
          <p className="error-message mb-3">{state.error}</p>
          <button className="refresh-button" onClick={refreshPage}>
            Try again
          </button>
        </div>
      )}

      {!state.loading && !state.error && !state.weather && <EmptyState />}

      {!state.loading &&
        !state.error &&
        state.weather &&
        state.weather.main && (
          <WeatherInfo
            weather={state.weather}
            unit={state.unit}
            time={time}
            convertTemp={convertTemp}
          />
        )}

      {!state.loading &&
        !state.error &&
        state.forecast &&
        state.forecast.length > 0 && (
          <ForecastList
            forecast={state.forecast}
            unit={state.unit}
            convertTemp={convertTemp}
          />
        )}
    </div>
  );
}

export default App;
