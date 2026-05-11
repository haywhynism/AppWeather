export const initialState = {
  states: "",
  weather: null,
  forecast: null,
  error: "",
  loading: false,
  lastCity: "",
  unit: "C",
  background: "default",
};

export function weatherReducer(state, action) {
  switch (action.type) {
    case "SET_STATE":
      return {
        ...state,
        states: action.payload,
      };
    case "SET_WEATHER":
      return {
        ...state,
        weather: action.payload,
      };
    case "SET_FORECAST":
      return {
        ...state,
        forecast: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_LAST_CITY":
      return {
        ...state,
        lastCity: action.payload,
      };
    case "SWITCH_UNIT":
      return {
        ...state,
        unit: state.unit === "C" ? "F" : "C",
      };
    case "SET_BACKGROUND":
      return {
        ...state,
        background: action.payload,
      };
    default:
      return state;
  }
}
