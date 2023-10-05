import MainBlock from "../block/MainBlock";
import classes from "./Canvas.module.css";

function Canvas() {
  return (
    <div className={classes.container}>
      <MainBlock />
    </div>
  );
}

export default Canvas;
