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
  | { type: "add"; payload: Pick<State, 'level' | 'id' | 'name'> }
  | { type: "remove"; payload: State["id"] }
  | { type: "edit"; payload: Pick<State, 'level' | 'id' | 'name'> }
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
        if(child.id === action.payload.id) {
          return { ...child, name: action.payload.name }
        } else {
          return child;
        }
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
ç
function findObjectById(id: string, obj: State): State | undefined {
  if (obj.id === id) {
    return obj;
  }
  for (const subObj of obj.subLevel) {
    const result = findObjectById(id, subObj);
    if (result) {
      return result;
    }
  }
  return undefined;
}

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
  function handleAddSubBlock(level: State["level"], id: State["id"]) {
    dispatch({ type: "add-sublevel", payload: { level, id } });
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
            name={name}
            subLevel={subLevel}
            onEditName={handleEditName.bind(null, id)}
            onRemove={handleRemove.bind(null, id)}
            onAddSubBlock={handleAddSubBlock.bind(null, level + 1, id)}
          />
        ))}
      </div>
    </>
  );
}

export default MainBlock;
