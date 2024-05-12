import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";

function Calculator() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ["+", "-", "/", "*"];
  const [calculatorNumber, setCalculatorNumber] = useState(undefined);
  const [calculatorNumber2, setCalculatorNumber2] = useState(undefined);
  const [operator, setOperator] = useState("");

  function handleOperator(operatorSign) {
    if (calculatorNumber || operatorSign === "-") {
      if (calculatorNumber2 && operator !== "") {
        showResult();
      }
      setOperator(operatorSign);
    }
  }

  function showResult() {
    let result;
    if (operator === "+") {
      result = parseInt(calculatorNumber, 10) + parseInt(calculatorNumber2, 10);
    }
    if (operator === "-") {
      result = parseInt(calculatorNumber, 10) - parseInt(calculatorNumber2, 10);
    }
    if (operator === "/") {
      result = parseInt(calculatorNumber, 10) / parseInt(calculatorNumber2, 10);
    }
    if (operator === "*") {
      result = parseInt(calculatorNumber, 10) * parseInt(calculatorNumber2, 10);
    }
    clear();
    setCalculatorNumber(result);
  }

  // firstNumber = firstNumber * 10 + number;
  function handleClick(number) {
    if (calculatorNumber === undefined) {
      setCalculatorNumber(operator + number);
      setOperator("");
    } else {
      if (!operator) {
        setCalculatorNumber(calculatorNumber + `${number}`);
      }
      if (operator) {
        setCalculatorNumber2(number);
      }
    }

    if (calculatorNumber2 !== undefined) {
      setCalculatorNumber2(calculatorNumber2 + `${number}`);
    }
  }

  function clear() {
    setCalculatorNumber(undefined);
    setCalculatorNumber2(undefined);
    setOperator("");
  }

  const style = {
    padding: "15px 30px",
    backgroundColor: "blue",
    color: "white",
    borderRadius: "30px",
    fontSize: "20px",
  };

  return (
    <>
      <h1>calculator</h1>
      <TextField
        onKeyDown={(e) => {
          if (e.key >= 0 || e.key < 0) {
            handleClick(e.key);
            console.log(e, "eeeeeeeeee");
          }
          for (let i = 0; operators.length > i; i++) {
            if (e.key === operators[i]) {
              handleOperator(e.key);
            }
          }
          if (e.key === "=" && calculatorNumber2 !== undefined) {
            showResult();
          }
        }}
        className="number-input"
        id="filled-basic"
        variant="filled"
        type="tel"
        size="small"
        sx={{
          backgroundColor: "rgba(145, 145, 145, 0.3)",
          width: "85%",
          input: { color: "white", fontSize: "30px" },
        }}
        value={`${calculatorNumber !== undefined ? calculatorNumber : ""}${
          operator !== undefined && operator
        }${calculatorNumber2 !== undefined ? calculatorNumber2 : ""}`}
      />

      <Stack
        width="100%"
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        margin="20px 0"
      >
        <Stack
          direction="row"
          width="60%"
          flexWrap="wrap"
          spacing={1}
          justifyContent="flex-start"
          margin="0 5px"
        >
          {numbers.map((number) => {
            return (
              <Button
                sx={{
                  width: "50px",
                  height: "90px",
                  backgroundColor: "grey",
                  padding: "10px 10px",
                  borderRadius: "30px",
                  fontSize: "20px",
                  color: "white",
                }}
                key={number}
                onClick={() => handleClick(number)}
              >
                {number}
              </Button>
            );
          })}
        </Stack>

        <Stack direction="column" spacing={2}>
          {operators.map((operatorSign) => {
            return (
              <Button
                style={style}
                key={operatorSign}
                onClick={() => handleOperator(operatorSign)}
              >
                {operatorSign}
              </Button>
            );
          })}
          <Button style={style} onClick={showResult}>
            =
          </Button>
          <Button style={style} onClick={clear}>
            C
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default Calculator;
