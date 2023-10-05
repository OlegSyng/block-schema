import Button from "./base/Button";
import locationLogo from "../assets/location-arrow-solid.svg";
import plusLogo from "../assets/plus-solid.svg";
import minusLogo from "../assets/minus-solid.svg";
import classes from "./Header.module.css";

function Header() {
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
        <Button className="mr-2">
          <img src={locationLogo} className={classes.logo} />
        </Button>
        <Button className="mr-1">
          <img src={minusLogo} className={classes.logo} />
        </Button>
        <Button>100%</Button>
        <Button className="ml-1">
          <img src={plusLogo} className={classes.logo} />
        </Button>
      </div>
    </header>
  );
}
export default Header;
