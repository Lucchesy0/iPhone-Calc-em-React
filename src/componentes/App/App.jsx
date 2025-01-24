import React, { useEffect, useState } from "react";
import menu from "../../assets/menu.png";
import Button from "../Button/Button";
import Display from "../Display/display";
import commafy from "../utils/commafy";

import "./App.css";

const App = () => {
  const [time, setTime] = useState(new Date());
  const [value, setValue] = useState("0");
  const [memory, setMemory] = useState(null);
  const [operator, setOperator] = useState(null);

  useEffect(() => {
    setTime(new Date());
  }, [new Date().getMinutes()]);

  const handleButtonPress = content => () => {
    const num = parseFloat(value);

    if (content === "AC") {
      setValue("0");
      setMemory(null);
      setOperator(null);
      return;
    }

    if (content === "±") {
      setValue((num * -1).toString());
      return;
    }

    if (content === "%") {
      setValue((num / 100).toString());
      setMemory(null);
      setOperator(null);
      return;
    }

    if (content === ".") {
      if (value.includes(".")) return;

      setValue(value + ".");
      return;
    }

    if (content === "=") {
      if (!operator) return;

      // Aqui, tratamos a divisão por zero
      if (operator === "÷" && parseFloat(value) === 0) {
        setValue("Erro"); // Exibe "Erro" caso a divisão por zero ocorra
        setMemory(null);
        setOperator(null);
        return;
      }

      if (operator === "+") {
        setValue((memory + parseFloat(value)).toString());
      } else if (operator === "−") {
        setValue((memory - parseFloat(value)).toString());
      } else if (operator === "×") {
        setValue((memory * parseFloat(value)).toString());
      } else if (operator === "÷") {
        setValue((memory / parseFloat(value)).toString());
      }
      setMemory(null);
      setOperator(null);
      return;
    }

    if (content === "+") {
      handleOperator("+");
      return;
    }
    if (content === "−") {
      handleOperator("−");
      return;
    }
    if (content === "×") {
      handleOperator("×");
      return;
    }
    if (content === "÷") {
      handleOperator("÷");
      return;
    }

    if (value[value.length - 1] === ".") {
      setValue(value + content);
    } else {
      setValue(parseFloat(num + content).toString());
    }
  };

  const handleOperator = (operator) => {
    if (operator !== null) {
      if (operator === "+") {
        setMemory(memory + parseFloat(value));
      } else if (operator === "−") {
        setMemory(memory - parseFloat(value));
      } else if (operator === "×") {
        setMemory(memory * parseFloat(value));
      } else if (operator === "÷") {
        setMemory(memory / parseFloat(value));
      }
    } else {
      setMemory(parseFloat(value));
    }
    setValue("0");
    setOperator(operator);
  };

  return (
    <div className="App">
      <div className="top">
        <div className="time">
          {time
            .getHours()
            .toString()
            .padStart(2, "0")}
          :
          {time
            .getMinutes()
            .toString()
            .padStart(2, "0")}
        </div>
        <div className="menu">
          <img className="wifi "src={menu} alt="menu" />
        </div>
      </div>
      <Display value={commafy(value)} />
      <div className="buttons">
        <Button
          onButtonClick={handleButtonPress}
          content="AC"
          type="function"
        />
        <Button onButtonClick={handleButtonPress} content="±" type="function" />
        <Button onButtonClick={handleButtonPress} content="%" type="function" />
        <Button onButtonClick={handleButtonPress} content="÷" type="operator" />
        <Button onButtonClick={handleButtonPress} content="7" />
        <Button onButtonClick={handleButtonPress} content="8" />
        <Button onButtonClick={handleButtonPress} content="9" />
        <Button onButtonClick={handleButtonPress} content="×" type="operator" />
        <Button onButtonClick={handleButtonPress} content="4" />
        <Button onButtonClick={handleButtonPress} content="5" />
        <Button onButtonClick={handleButtonPress} content="6" />
        <Button onButtonClick={handleButtonPress} content="−" type="operator" />
        <Button onButtonClick={handleButtonPress} content="1" />
        <Button onButtonClick={handleButtonPress} content="2" />
        <Button onButtonClick={handleButtonPress} content="3" />
        <Button onButtonClick={handleButtonPress} content="+" type="operator" />
        <Button onButtonClick={handleButtonPress} content="0" />
        <Button onButtonClick={handleButtonPress} content="." />
        <Button onButtonClick={handleButtonPress} content="=" type="operator" />
      </div>
    </div>
  );
};

export default App;
