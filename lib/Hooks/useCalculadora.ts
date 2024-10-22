import { useTransactionToADDState } from "../store";
import React from "react";

// Estado inicial
const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: "0",
  nextValue: null,
  resultGiven: false, // Indica si ya se ha dado un resultado
};

type InitialState = {
  currentValue: string;
  operator: string | null;
  nextValue: string | null;
  previousValue: string;
  resultGiven: boolean;
};

// Manejador de números
const handleNumber = (value: string | number, state: InitialState) => {
  const { previousValue, operator, nextValue } = state;
  if (state.resultGiven) {
    // Si ya se dio un resultado, reiniciar la pantalla
    return {
      ...state,
      currentValue: `${value}`,
      previousValue: `${value}`,
      nextValue: null,
      resultGiven: false,
    };
  }

  if (state.currentValue === "0") {
    return {
      ...state,
      currentValue: `${value}`,
      previousValue: `${value}`,
      nextValue: null,
    };
  }

  if (state.operator === null) {
    return {
      ...state,
      currentValue: parseFloatDecimal(`${previousValue}${value}`),
      previousValue: `${state.previousValue}${value}`,
    };
  } else {
    const previous = parseFloatDecimal(previousValue ?? "0");
    const next = parseFloatDecimal(`${nextValue ?? "0"}${value}`);
    const current = `${previous} ${operator} ${next}`;
    return {
      ...state,
      nextValue: `${nextValue ?? ""}${value}`,
      currentValue: current,
    };
  }
};

// Manejador de operaciones matemáticas
const handleEqual = (state: InitialState) => {
  const { previousValue, operator, nextValue } = state;

  if (previousValue === null || operator === null || nextValue === null) return state;

  const current = parseFloat(nextValue);
  const previous = parseFloat(previousValue);
  const resetState = { operator: null, resultGiven: true, nextValue: null };

  let result;
  switch (operator) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "*":
      result = previous * current;
      break;
    case "/":
      result = previous / current;
      break;
    default:
      return state;
  }

  return {
    ...state,
    currentValue: parseFloatDecimal(`${result}`),
    previousValue: `${result}`,
    ...resetState,
  };
};
const handleOperator = (state: InitialState, value: string) => {
  const { nextValue, previousValue } = state;
  if (nextValue) {
    return {
      ...state,
      operator: value,
      currentValue: `${parseFloatDecimal(previousValue ?? "0")} ${value} ${parseFloatDecimal(nextValue ?? "0")}`,
    };
  }
  return {
    ...state,
    operator: value,
    currentValue: `${parseFloatDecimal(previousValue ?? "0")} ${value}`,
    resultGiven: false,
  };
};

const handePorcentage = (state: InitialState) => {
  const { previousValue, nextValue, operator, resultGiven } = state;

  if (resultGiven) {
    const current = parseFloat(previousValue) * 0.01;
    return {
      ...state,
      currentValue: parseFloatDecimal(`${current}`),
      previousValue: parseFloatDecimal(`${current}`),
      resultGiven: false,
    };
  }
  if (nextValue) {
    const current = parseFloat(nextValue) * 0.01;
    return {
      ...state,
      currentValue: `${parseFloatDecimal(previousValue)} ${operator} ${parseFloatDecimal(`${current}`)}`,
      nextValue: parseFloatDecimal(`${current}`),
    };
  }
  if (operator) {
    const current = parseFloat(previousValue) * 0.01;
    return {
      ...state,
      currentValue: `${parseFloatDecimal(`${current}`)} ${operator}`,
      previousValue: parseFloatDecimal(`${current}`),
      resultGiven: false,
    };
  }
  const current = parseFloat(previousValue) * 0.01;
  return {
    ...state,
    currentValue: parseFloatDecimal(`${current}`),
    previousValue: parseFloatDecimal(`${current}`),
  };
};

const handlePosNeg = (state: InitialState) => {
  const { resultGiven, nextValue, previousValue, operator } = state;
  if (resultGiven) {
    const current = parseFloat(previousValue) * -1;
    return {
      ...state,
      currentValue: parseFloatDecimal(`${current}`),
      previousValue: parseFloatDecimal(`${current}`),
      resultGiven: false,
    };
  }
  if (nextValue) {
    const current = parseFloat(nextValue) * -1;
    return {
      ...state,
      currentValue: `${parseFloatDecimal(previousValue)} ${operator} ${parseFloatDecimal(`${current}`)}`,
      nextValue: parseFloatDecimal(`${current}`),
    };
  }
  if (operator) {
    const current = parseFloat(previousValue) * -1;
    return {
      ...state,
      currentValue: `${parseFloatDecimal(`${current}`)} ${operator}`,
      previousValue: parseFloatDecimal(`${current}`),
      resultGiven: false,
    };
  }
  const current = parseFloat(previousValue) * -1;
  return {
    ...state,
    currentValue: parseFloatDecimal(`${current}`),
    previousValue: parseFloatDecimal(`${current}`),
  };
};

// Reducer de la calculadora
const calculator = (state: InitialState, { type = "", value = "" }: any) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);
    case "clear":
      return initialState;
    case "posneg":
      return handlePosNeg(state);
    case "percentage":
      return handePorcentage(state);
    case "operator":
      return handleOperator(state, value);
    case "equal":
      return handleEqual(state);
    default:
      return state;
  }
};

export const useCalculadora = () => {
  const [state, dispatch] = React.useReducer(calculator, initialState);
  const setAmount = useTransactionToADDState((state) => state.setAmount);

  React.useEffect(() => {
    const { currentValue, previousValue } = state;
    const newamoint = parseFloat(previousValue);
    if (isUnresolvedOperation(currentValue) || currentValue.includes(" ")) {
      setAmount(null);
      return;
    }
    setAmount(newamoint);
  }, [state.currentValue]);

  // Función para manejar la entrada de números
  const handleNumberClick = React.useCallback((number: string | number) => {
    dispatch({ type: "number", value: number });
  }, []);

  // Función para manejar operadores
  const handleOperatorClick = React.useCallback((operator: string) => {
    dispatch({ type: "operator", value: operator });
  }, []);

  // Función para manejar el resultado
  const handleEqualClick = React.useCallback(() => {
    dispatch({ type: "equal" });
  }, []);

  // Función para limpiar la calculadora
  const handleClearClick = React.useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const handleTap = React.useCallback((value: "posneg" | "percentage") => {
    dispatch({ type: value });
  }, []);

  return {
    handleNumberClick,
    handleOperatorClick,
    handleEqualClick,
    handleTap,
    handleClearClick,
    state,
  };
};

function parseFloatDecimal(value: string) {
  return parseFloat(value).toLocaleString("us-EN", {
    maximumFractionDigits: 15,
  });
}

function isUnresolvedOperation(expression: string) {
  // Expresión regular que busca números seguidos de un operador y luego otro número
  const unresolvedRegex = /\d+(\s*[-+*/]\s*)\d+/;
  return unresolvedRegex.test(expression);
}
