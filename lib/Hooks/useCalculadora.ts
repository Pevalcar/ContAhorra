import { useRef, useState } from "react";

export const useCalculadora = () => {
  const [valuePantalla, setValuePantalla] = useState("");

  const prevValue = useRef("");
  const resultDado = useRef(false);

  function reset() {
    setValuePantalla("");
    prevValue.current = "";
  }

  function calcular() {
    if (valuePantalla === "") return;
    if (valuePantalla === "Error") return;
    if (valuePantalla === prevValue.current) return;
    try {
      setValuePantalla(eval(valuePantalla).toString());
      prevValue.current = valuePantalla;
      resultDado.current = true;
    } catch (error) {
      setValuePantalla("Error");
      prevValue.current = "Error";
      resultDado.current = true;
    }
  }
  //TODO agregar soporte teclado para el desktop de la calculadora
  //TODO si das + o - y luego * o / se borra el + o - y se reemplasa por * o / que esta mal

  function onHandlePress(value: string | number) {
    if (resultDado.current) {
      resultDado.current = false;
      if (isOperator(value)) {
        setValuePantalla((prevValue) => prevValue + value);
        return;
      }
      reset();
      setValuePantalla(value.toString());
      return;
    }
    if (value === "=") {
      calcular();
      return;
    }
    if (isOperator(value)) {
      if (entWithOperator(valuePantalla)) {
        return setValuePantalla((prevValue) => prevValue.slice(0, -1) + value);
      }
    }
    if (valuePantalla === "" && (value === "*" || value === "/")) {
      return;
    }

    setValuePantalla((prevValue) => prevValue + value);
  }

  return {
    valuePantalla,
    setValuePantalla: onHandlePress,
    reset,
  };
};

const isOperator = (value: string | number) => {
  if (typeof value === "number") return false;
  return ["+", "-", "*", "/"].includes(value);
};

const entWithOperator = (value: string) => {
  const lastValue = value.slice(-1);
  return isOperator(lastValue);
};
