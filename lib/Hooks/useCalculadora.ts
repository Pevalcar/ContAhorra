import { useTransactionToADDState } from "../store";
import { useEffect, useRef, useState } from "react";

const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null,
};
type INItIALSTATE = {
  currentValue: string;
  operator: string | null;
  previousValue: string | null;
};

//TODO usar useReducer para la calculadora
export const useCalculadora = () => {
  const [state, setState] = useState<INItIALSTATE>(initialState);

  const handleNumber = (value: string | number, state: INItIALSTATE) => {
    if (state.currentValue === "0") {
      return `${value}`;
    }

    return `${state.currentValue}${value}`;
  };

  const handleEqual = (state: INItIALSTATE) => {
    const { currentValue, previousValue, operator } = state;

    const resetState = { operator: null, previousValue: null };
    if (operator === null) return resetState;
    if (previousValue === null) return resetState;

    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);

    switch (operator) {
      case "+":
        return {
          currentValue: `${previous + current}`,
          ...resetState,
        };
      case "-":
        return {
          currentValue: `${previous - current}`,
          ...resetState,
        };
      case "*":
        return {
          currentValue: `${previous * current}`,
          ...resetState,
        };
      case "/":
        return {
          currentValue: `${previous / current}`,
          ...resetState,
        };

      default:
    }
  };

  const calculator = (type: string, value: string | number) => {
    setState((prevState) => {
      let state = prevState;
      switch (type) {
        case "number":
          state.currentValue = handleNumber(value, prevState);
          break;
        case "clear":
          state = initialState;
          break;
        case "posneg":
          state.currentValue = `${parseFloat(state.currentValue) * -1}`;
          break;
        case "percentage":
          state.currentValue = `${parseFloat(state.currentValue) * 0.01}`;
          break;
        case "operator":
          state = {
            operator: value as string,
            previousValue: state.currentValue,
            currentValue: "0",
          };
          break;
        case "equal": {
          state = handleEqual(prevState);
          break;
        }
        default:
          return state;
      } //TODO arreglar alculadora
    });
  };

  return {
    calculator,
    state,
  };
};
