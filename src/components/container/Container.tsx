import Block from "../block/Block";
import classes from "./Container.module.css";

function Container() {
  return (
    <section className={classes.container}>
      <Block type="main" initialValue={{ level: 0, name: "Categories" }} onRemove={() => {}} />
    </section>
  );
}

export default Container;
