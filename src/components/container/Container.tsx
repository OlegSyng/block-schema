import { useReducer, useRef } from "react";
import Block from "../block/Block";
import SelectButton from "../buttons/SelectButton";
import Button from "../buttons/Button";
import Header from "../header/Header";
import locationLogo from "../../assets/location-arrow-solid.svg";
import chevronLeftLogo from "../../assets/chevron-left-solid.svg";
import classes from "./Container.module.css";
import headerClasses from "../header/Header.module.css";
import buttonClasses from "../buttons/Button.module.css";
import type { Reducer } from "react";

export interface Position {
  x: number;
  y: number;
}

class ContainerState {
  isDragging: boolean = false;
  offset: Position = { x: 0, y: 0 };
  scale: string = "100";

  constructor(public position: Position) {
    this.position = position;
  }
}

type ContainerAction =
  | { type: "offset"; payload: Position }
  | { type: "position"; payload: Position }
  | { type: "recenter"; payload: Position }
  | { type: "move"; payload: number }
  | { type: "stop-move" }
  | { type: "scale"; payload: string };

const initialState = new ContainerState({ x: 0, y: 0 });

const reducer: Reducer<ContainerState, ContainerAction> = (state, action) => {
  switch (action.type) {
    case "offset": {
      const newOffset = { x: action.payload.x - state.position.x, y: action.payload.y - state.position.y };
      return {
        ...state,
        isDragging: true,
        offset: newOffset,
      };
    }
    case "position": {
      if (state.isDragging) {
        const newPosition = { x: action.payload.x - state.offset.x, y: action.payload.y - state.offset.y };
        return {
          ...state,
          position: newPosition,
        };
      } else {
        return state;
      }
    }
    case "recenter": {
      return {
        ...state,
        position: action.payload,
      };
    }
    case "move": {
      const newPosition = { x: state.position.x, y: state.position.y };
      switch (action.payload) {
        case 1: {
          newPosition.x += 50;
          break;
        }
        case 2: {
          newPosition.x -= 50;
          break;
        }
        case 3: {
          newPosition.y += 50;
          break;
        }
        case 4: {
          newPosition.y -= 50;
          break;
        }
      }
      return {
        ...state,
        position: newPosition,
      };
    }
    case "stop-move": {
      return {
        ...state,
        isDragging: false,
      };
    }
    case "scale": {
      return {
        ...state,
        scale: action.payload,
      };
    }
    default:
      return new ContainerState({ x: 0, y: 0 });
  }
};

function Container() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const sectionRef = useRef<HTMLElement>(null);
  const schemaRef = useRef<HTMLDivElement>(null);

  function handleMouseDown(pos: Position) {
    dispatch({ type: "offset", payload: pos });
  }
  function handleMouseMove(pos: Position) {
    dispatch({ type: "position", payload: pos });
  }
  function handleMouseUp() {
    dispatch({ type: "stop-move" });
  }
  function handleScaleChange(scale: string) {
    dispatch({ type: "scale", payload: scale });
  }
  function recenterContainer() {
    if (sectionRef.current && schemaRef.current) {
      const sectionWidth = sectionRef.current.clientWidth;
      const sectionHeight = sectionRef.current.clientHeight;
      const schemaWidth = schemaRef.current.clientWidth;
      const schemaHeight = schemaRef.current.clientHeight;
      const newPosition = {
        x: (sectionWidth - schemaWidth) / 2,
        y: (sectionHeight - schemaHeight) / 2,
      };
      dispatch({ type: "recenter", payload: newPosition });
    }
  }
  function handleMove(direction: number) {
    dispatch({ type: "move", payload: direction });
  }

  const calculatedScale = +state.scale / 100;

  return (
    <>
      <Header
        recenterButton={
          <Button className="mr-2" onClick={recenterContainer}>
            <img src={locationLogo} className={headerClasses.logo} />
          </Button>
        }
        selectButton={<SelectButton onScaleChange={handleScaleChange} />}
      />
      <section className={classes.container} ref={sectionRef}>
        <Button onClick={handleMove.bind(null, 1)} className={`${buttonClasses.button} ${classes["button-left"]}`}>
          <img src={chevronLeftLogo} className={classes.logo} />
        </Button>
        <Button onClick={handleMove.bind(null, 2)} className={`${buttonClasses.button} ${classes["button-right"]}`}>
          <img src={chevronLeftLogo} className={classes.logo} />
        </Button>
        <Button onClick={handleMove.bind(null, 3)} className={`${buttonClasses.button} ${classes["button-up"]}`}>
          <img src={chevronLeftLogo} className={classes.logo} />
        </Button>
        <Button onClick={handleMove.bind(null, 4)} className={`${buttonClasses.button} ${classes["button-down"]}`}>
          <img src={chevronLeftLogo} className={classes.logo} />
        </Button>
        <div
          style={{
            position: "absolute",
            top: state.position.y + "px",
            left: state.position.x + "px",
            scale: calculatedScale.toString(),
          }}
          ref={schemaRef}
        >
          <Block
            type="main"
            initialValue={{ level: 0, name: "Categories" }}
            index={0}
            total={0}
            onRemove={() => {}}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        </div>
      </section>
    </>
  );
}

export default Container;
