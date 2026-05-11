export const setState = (dispatch, states) =>
  dispatch({ type: "SET_STATE", payload: states });

export const setWeather = (dispatch, weather) =>
  dispatch({ type: "SET_WEATHER", payload: weather });

export const setForecast = (dispatch, forecast) =>
  dispatch({ type: "SET_FORECAST", payload: forecast });

export const setError = (dispatch, error) =>
  dispatch({ type: "SET_ERROR", payload: error });

export const setLoading = (dispatch, loading) =>
  dispatch({ type: "SET_LOADING", payload: loading });

export const setLastCity = (dispatch, lastCity) =>
  dispatch({ type: "SET_LAST_CITY", payload: lastCity });

export const switchUnit = (dispatch) => dispatch({ type: "SWITCH_UNIT" });

export const setBackground = (dispatch, background) =>
  dispatch({ type: "SET_BACKGROUND", payload: background });
