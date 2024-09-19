import { DEVELOPMENT } from "../config";
import { useTransactionToADDState } from "../store/TransactionToAddStore";
import { useTransactionToAdd } from "./useTransactionToAdd";
import { useEffect, useRef, useState } from "react";

//TODO usar useReducer para la calculadora
export const useCalculadora = () => {
  const [valuePantalla, setValuePantalla] = useState("");
  const sign = useRef("");
  const firstValue = useRef("");
  const secondValue = useRef("");
  const prevValue = useRef("");
  const resultDado = useRef(false);
  const { setAmount, amount } = useTransactionToAdd();

  useEffect(() => {
    setAmount(parseFloat(valuePantalla));
  }, [valuePantalla]);

  useEffect(() => {
    if (!amount) return;

    setValuePantalla(amount.toString());
  }, []);

  // DEVELOPMENT
  //   ? console.log(
  //       " valuePantalla",
  //       valuePantalla,
  //       " firstValue",
  //       firstValue.current,
  //       " secondValue",
  //       secondValue.current,
  //       " sign",
  //       sign.current,
  //     )
  //   : "";

  function setSign(value: string) {
    if (value === "=") {
      calcular();
      return;
    }
    if (firstValue.current === "") {
      if (value === "-" || value === "+") {
        setValuePantalla(value);
        return;
      }
    } else if (secondValue.current === "") {
      sign.current = value;
      if (ifLastValueIsOperator(valuePantalla)) {
        setValuePantalla((prevValue) => prevValue.slice(0, -1) + value);
        return;
      }
      setValuePantalla((prevValue) => prevValue + value);
      resultDado.current = false;
      return;
    }
  }

  function reset() {
    setValuePantalla("");
    prevValue.current = "";
    firstValue.current = "";
    secondValue.current = "";
    sign.current = "";
    resultDado.current = false;
  }

  function calcular() {
    if (valuePantalla === "") return;
    if (valuePantalla === "Error") return;
    if (valuePantalla === prevValue.current) return;
    try {
      setValuePantalla((prev) => {
        //TODO es importante saber de esto Intl.NumberFormat
        if (secondValue.current === "") return; //TODO refactorizar la caluladora para dejar de usar eval
        const lastValue = eval(prev).toString();
        firstValue.current = lastValue;
        secondValue.current = "";
        prevValue.current = lastValue;
        return lastValue;
      });
      resultDado.current = true;
    } catch (error) {
      setValuePantalla("Error");
      prevValue.current = "Error";
      resultDado.current = true;
    }
  }

  function onHandlePress(value: string | number) {
    if (resultDado.current) {
      setValuePantalla(() => {
        resultDado.current = false;
        sign.current = "";
        return value.toString();
      });
      return;
    }
    if (sign.current === "") {
      setValuePantalla((prevValue) => {
        const lastValue = prevValue + value;
        firstValue.current = lastValue;
        return lastValue;
      });
      return;
    } else {
      setValuePantalla((prevValue) => {
        const lastValue = prevValue + value;
        secondValue.current = lastValue;
        return lastValue;
      });
      return;
    }
  }
  return {
    valuePantalla,
    setValuePantalla: onHandlePress,
    reset,
    setSign,
  };
};

function ifLastValueIsOperator(value: string) {
  const lastValue = value.slice(-1);
  return ["+", "-", "*", "/"].includes(lastValue);
}
