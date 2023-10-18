import { useReducer, useRef, useEffect } from "react";
import Block from "../block/Block";
import SelectButton from "../buttons/SelectButton";
import Button from "../buttons/Button";
import Header from "../header/Header";
import Drag from "../drag/Drag";
import locationLogo from "../../assets/location-arrow-solid.svg";
import chevronLeftLogo from "../../assets/chevron-left-solid.svg";
import classes from "./Container.module.css";
import headerClasses from "../header/Header.module.css";
import buttonClasses from "../buttons/Button.module.css";
import type { Reducer, PointerEvent } from "react";

export interface Position {
  x: number;
  y: number;
}

class ContainerState {
  scale: string = "100";
  isCenter: boolean = true;
  constructor(public position: Position) {}
}

type ContainerAction =
  | { type: "position"; payload: Position }
  | { type: "recenter"; payload: Position }
  | { type: "move"; payload: number }
  | { type: "scale"; payload: string };

const initialState = new ContainerState({x: 0, y: 0});

const reducer: Reducer<ContainerState, ContainerAction> = (state, action) => {
  switch (action.type) {
    case "position": {
      const newPosition = { x: state.position.x + action.payload.x, y: state.position.y + action.payload.y };
      return {
        ...state,
        isCenter: false,
        position: newPosition,
      };
    }
    case "recenter": {
      return {
        ...state,
        isCenter: true,
        position: { x: action.payload.x / 2, y: action.payload.y / 2 },
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
        isCenter: false,
        position: newPosition,
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

  useEffect(() => {
    if(sectionRef.current) {
      dispatch({
        type: "recenter",
        payload: { x: sectionRef.current.clientWidth, y: sectionRef.current.clientHeight },
      });
    }
  }, [])

  function handleScaleChange(scale: string) {
    dispatch({ type: "scale", payload: scale });
  }
  function handleMove(direction: number) {
    dispatch({ type: "move", payload: direction });
  }
  function handleDragMove(event: PointerEvent<HTMLDivElement>) {
    dispatch({ type: "position", payload: { x: event.movementX, y: event.movementY } });
  }
  function handleRecenter() {
    dispatch({
      type: "recenter",
      payload: { x: sectionRef.current!.clientWidth, y: sectionRef.current!.clientHeight },
    });
  }

  const calculatedScale = +state.scale / 100;

  return (
    <>
      <Header
        recenterButton={
          <Button className="mr-2" onClick={handleRecenter}>
            <img src={locationLogo} className={headerClasses.logo} />
          </Button>
        }
        selectButton={<SelectButton onScaleChange={handleScaleChange} />}
      />
      <section className={classes.container} ref={sectionRef}>
        <Button 
          onClick={handleMove.bind(null, 1)} 
          className={`${buttonClasses.button} ${classes["button-left"]}`}
        >
          <img src={chevronLeftLogo} className={classes.logo} />
        </Button>
        <Button 
          onClick={handleMove.bind(null, 2)} 
          className={`${buttonClasses.button} ${classes["button-right"]}`}
        >
          <img src={chevronLeftLogo} className={classes.logo} />
        </Button>
        <Button 
          onClick={handleMove.bind(null, 3)} 
          className={`${buttonClasses.button} ${classes["button-up"]}`}
        >
          <img src={chevronLeftLogo} className={classes.logo} />
        </Button>
        <Button 
          onClick={handleMove.bind(null, 4)} 
          className={`${buttonClasses.button} ${classes["button-down"]}`}
        >
          <img src={chevronLeftLogo} className={classes.logo} />
        </Button>
        <Drag
          onDragMove={handleDragMove}
          style={{
            position: "absolute",
            top: state.position.y + 'px',
            left: state.position.x + 'px',
            scale: calculatedScale.toString(),
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Block 
            type="main" 
            index={0} 
            total={0} 
            onRemove={() => {}} 
            initialValue={{ level: 0, name: "Categories" }} 
          />
        </Drag>
      </section>
    </>
  );
}

export default Container;
