import { legacy_createStore } from "redux";

export const counterActions = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  UPDATE: "UPDATE",
  START: "START",
  TOTAL: "TOTAL",
};

export const counterName = {
  COUNT: "USER-CART-COUNT",
  CART: "USER-CART",
  DETAIL: "USER-DETAIL",
  TOTAL: "USER-TOTAL",
  START: "START",
};

const counterReducer = (
  state = { count: 0, cartArray: [], total: 0 },
  action
) => {
  if (action.type === counterActions.INCREMENT) {
    return {
      ...state,
      count: parseInt(sessionStorage.getItem(counterName.COUNT)) + 1,
    };
  }

  if (action.type === counterActions.DECREMENT) {
    return {
      ...state,
      count: parseInt(sessionStorage.getItem(counterName.COUNT)) - 1,
    };
  }

  if (action.type === counterActions.UPDATE) {
    if (!sessionStorage.getItem(counterName.TOTAL)) {
      sessionStorage.setItem(counterName.TOTAL, 0);
    }

    return {
      count: parseInt(sessionStorage.getItem(counterName.COUNT)),
      cartArray: JSON.parse(
        "[" + sessionStorage.getItem(counterName.CART) + "]"
      ),
      total: sessionStorage.getItem(counterName.TOTAL),
    };
  }

  if (action.type === counterActions.START) {
    if (!sessionStorage.getItem(counterName.COUNT)) {
      sessionStorage.setItem(counterName.COUNT, 0);
    }

    return {
      ...state,
      count: parseInt(sessionStorage.getItem(counterName.COUNT)),
      total: sessionStorage.getItem(counterName.TOTAL),
    };
  }

  return state;
};

const counterStore = legacy_createStore(counterReducer);
export default counterStore;
