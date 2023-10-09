import { useState } from "react";
import Button from "./Button";
import minusLogo from "../../assets/minus-solid.svg";
import plusLogo from "../../assets/plus-solid.svg";
import classes from "./SelectButton.module.css";
import buttonClasses from "./Button.module.css";
import type { ChangeEvent } from "react";

const options = [
  { value: "25", label: "25%" },
  { value: "30", label: "30%" },
  { value: "40", label: "40%" },
  { value: "50", label: "50%" },
  { value: "60", label: "60%" },
  { value: "70", label: "70%" },
  { value: "80", label: "80%" },
  { value: "90", label: "90%" },
  { value: "100", label: "100%" },
  { value: "125", label: "125%" },
  { value: "150", label: "150%" },
];

interface SelectButtonProps {
  onScaleChange: (scale: string) => void;
}

function SelectButton({ onScaleChange }: SelectButtonProps) {
  const [optionIndex, setOptionIndex] = useState(8);

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setOptionIndex(+event.target.value);
    onScaleChange(options[+event.target.value].value);
  }
  function handleClickMinus() {
    if (optionIndex > 0) {
      setOptionIndex(optionIndex - 1);
      onScaleChange(options[optionIndex - 1].value);
    }
  }
  function handleClickPlus() {
    if (optionIndex < options.length - 1) {
      setOptionIndex(optionIndex + 1);
      onScaleChange(options[optionIndex + 1].value);
    }
  }

  return (
    <div className={classes["select-container"]}>
      <Button className="mr-1" onClick={handleClickMinus}>
        <img src={minusLogo} className={classes.logo} />
      </Button>
      <select id="select-scale" value={optionIndex} onChange={handleSelectChange} className={buttonClasses.button}>
        {options.map((option, index) => (
          <option key={option.value} value={index}>
            {option.label}
          </option>
        ))}
      </select>
      <Button className="ml-1" onClick={handleClickPlus}>
        <img src={plusLogo} className={classes.logo} />
      </Button>
    </div>
  );
}

export default SelectButton;
