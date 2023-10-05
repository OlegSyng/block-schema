import { useReducer } from "react";
import WidgetButton from "../base/WidgetButton";
import SubBlock from "./SubBlock";
import classes from "./Block.module.css";
import type { Reducer } from "react";

export interface State {
  id: string;
  level: number;
  name: string;
  subLevel: State[];
}

class Block implements State {
  id: string;
  subLevel: Block[];

  constructor(public level: number, public name: string) {
    this.id = Math.random().toString();
    this.subLevel = [];
  }
}

type Action =
  | { type: "add"; payload: State["level"] }
  | { type: "remove"; payload: State["id"] }
  | { type: "edit"; payload: { id: State["id"]; name: State["name"] } }
  | { type: "reset" };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "add": {
      const newBlock = new Block(state.level + 1, "");
      return { ...state, subLevel: [...state.subLevel, newBlock] };
    }
    case "remove": {
      const newSubLevel = state.subLevel.filter((child) => child.id !== action.payload);
      return { ...state, subLevel: newSubLevel };
    }
    case "edit": {
      const newSubLevel = state.subLevel.map((child) => {
        if (child.id === action.payload.id) {
          return { ...child, name: action.payload.name };
        }
        return child;
      });
      return { ...state, subLevel: newSubLevel };
    }
    case "reset": {
      return { ...initialState };
    }
    default:
      return state;
  }
};

const initialState: State = {
  id: "0",
  level: 0,
  name: "Categories",
  subLevel: [],
};

function MainBlock() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleAdd() {
    dispatch({ type: "add", payload: state.level });
  }
  function handleEditName(id: State["id"], newName: State["name"]) {
    dispatch({ type: "edit", payload: { id, name: newName } });
  }
  function handleRemove(id: State["id"]) {
    dispatch({ type: "remove", payload: id });
  }

  const className = `${classes.container} ${classes.main}`;

  return (
    <>
      <div className="flex items-center">
        <div className={className}>{state.name}</div>
        <WidgetButton variant="plus" className="m-1 ml-2" onClick={handleAdd} />
      </div>
      <div>
        {state.subLevel.map(({ id, level, name, subLevel }) => (
          <SubBlock
            key={id}
            level={level}
            name={name}
            subLevel={subLevel}
            onEditName={handleEditName.bind(null, id)}
            onRemove={handleRemove.bind(null, id)}
          />
        ))}
      </div>
    </>
  );
}

export default MainBlock;
