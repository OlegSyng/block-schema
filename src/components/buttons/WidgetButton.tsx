import plusLogo from "../../assets/plus-solid.svg";
import checkLogo from "../../assets/check-solid.svg";
import closeLogo from "../../assets/xmark-solid.svg";
import penLogo from "../../assets/pen-solid.svg";
import classes from "./WidgetButton.module.css";

interface WidgetButtonProps {
  onClick?: () => void;
  variant: "plus" | "check" | "close" | "pen";
  className?: string;
}

function selectLogo(variant: WidgetButtonProps["variant"]) {
  switch (variant) {
    case "check":
      return checkLogo;
    case "close":
      return closeLogo;
    case "pen":
      return penLogo;
    default:
      return plusLogo;
  }
}

function WidgetButton({ variant, onClick, className }: WidgetButtonProps) {
  const logo = selectLogo(variant);
  const buttonClasses = classes.button + " " + classes[variant] + " " + className;

  return (
    <button className={buttonClasses} onClick={onClick}>
      <img src={logo} className={classes.logo} />
    </button>
  );
}

export default WidgetButton;
