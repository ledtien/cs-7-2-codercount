import { createStore } from "redux";

const initialState = {
  count: 0,
  defaultColor: "red",
  boxColors: [],
  currentUser: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT":
      if (state.count === 1) return state;
      return {
        ...state,
        count: state.count - 1,
      };
    case "CHANGE_COLOR":
      return {
        ...state,
        defaultColor: action.payload,
      };

    case "CHANGE_COLOR_BOX":
      const boxColors = state.boxColors;
      boxColors[action.idx] = action.payload;
      return {
        ...state,
        boxColors,
      };

    case "SIGN_IN":
      return { ...state, currentUser: action.payload };
    case "SIGN_OUT":
      return { ...state, currentUser: "" };
    default:
      return state;
  }
}

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
