import { useReducer, useState } from "react";
import WidgetButton from "../base/WidgetButton";
import Lines from "../lines/Lines";
import classes from "./Block.module.css";
import type { Reducer, ChangeEvent } from "react";

class BlockState {
  id: string;
  subLevel: BlockState[];

  constructor(public level: number, public name: string) {
    this.id = Math.random().toString();
    this.subLevel = [];
  }
}

interface BlockProps {
  type: "main" | "sub";
  index: number;
  total: number;
  initialValue: Pick<BlockState, "level" | "name">;
  isInitialEditing?: boolean;
  onRemove: () => void;
}

type BlockAction =
  | { type: "add" }
  | { type: "remove"; payload: BlockState["id"] }
  | { type: "edit"; payload: BlockState["name"] };

const reducer: Reducer<BlockState, BlockAction> = (state, action) => {
  switch (action.type) {
    case "add": {
      const newBlock = new BlockState(state.level + 1, "");
      return { ...state, subLevel: [...state.subLevel, newBlock] };
    }
    case "remove": {
      const newSubLevel = state.subLevel.filter((child) => child.id !== action.payload);
      return { ...state, subLevel: newSubLevel };
    }
    case "edit": {
      return { ...state, name: action.payload };
    }
    default:
      return state;
  }
};

function createInitialState(initialValue: BlockProps["initialValue"]): BlockState {
  return new BlockState(initialValue.level, initialValue.name);
}

function Block({ type, index, total, initialValue, onRemove, isInitialEditing }: BlockProps) {
  const [state, dispatch] = useReducer(reducer, initialValue, createInitialState);
  const [isEditing, setIsEditing] = useState(isInitialEditing ?? false);

  function handleAdd() {
    dispatch({ type: "add" });
  }
  function handleRemove(subBlockId: BlockState["id"]) {
    dispatch({ type: "remove", payload: subBlockId });
  }
  function handleEdit(event: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "edit", payload: event.target.value });
  }
  function handleEditingMode() {
    setIsEditing((prev) => !prev);
  }

  const hasSubLevel = state.subLevel.length > 0;
  const blockNameClasses = `${classes["block-name"]} ${classes[type]} ${hasSubLevel ? classes[`${type}-sublevel`] : ''} ${!isEditing ? classes[`level${state.level}`]: ''}`

  return (
    <div className={classes.container}>
       {type === 'sub' && <Lines index={index} total={total} location="back" />}
       <div className={classes['block-box']}>
          {type === 'sub' && <Lines index={index} total={total} location="front" />}
        <div className={blockNameClasses}>
          {isEditing ? (
            <input
              type="text"
              value={state.name}
              onChange={handleEdit}
              placeholder="Category name"
            />
          ) : (
            state.name ? state.name : <em>&nbsp;</em>
          )}
          <div className={classes["block-actions"]}>
            {!isEditing && <WidgetButton variant="plus" className="m-1 ml-2" onClick={handleAdd} />}
            {type === "sub" && (
              <WidgetButton variant={!isEditing ? "pen" : "check"} className="m-1" onClick={handleEditingMode} />
            )}
            {type === "sub" && <WidgetButton variant="close" className="m-1" onClick={onRemove} />}
          </div>
        </div>
       </div>
      {hasSubLevel && (
        <div className={classes['children']}>
          {state.subLevel.map(({ id, level }, index) => (
            <Block
              key={id}
              type="sub"
              index={index}
              total={state.subLevel.length}
              initialValue={{ level, name: "" }}
              isInitialEditing={true}
              onRemove={handleRemove.bind(null, id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Block;
