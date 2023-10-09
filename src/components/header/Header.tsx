import Button from "../buttons/Button";
import classes from "./Header.module.css";
import { ReactElement } from "react";

interface HeaderProps {
  recenterButton: ReactElement;
  selectButton: ReactElement;
}

function Header({ recenterButton, selectButton }: HeaderProps) {
  return (
    <header className={classes.header}>
      <div className={classes["title-container"]}>
        <h2 className={classes.title}>Services</h2>
        <span className={classes["count-container"]}>0</span>
      </div>
      <div>
        <Button variant="primary" className="mr-1">
          List View
        </Button>
        {recenterButton}
        {selectButton}
      </div>
    </header>
  );
}
export default Header;
