import { useReducer, useState, useRef } from "react";
import Canvas from "../canvas/Canvas";
import WidgetButton from "../base/WidgetButton";
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

function Block({ type, initialValue, onRemove, isInitialEditing }: BlockProps) {
  const [state, dispatch] = useReducer(reducer, initialValue, createInitialState);
  const [isEditing, setIsEditing] = useState(isInitialEditing ?? false);
  const blockRef = useRef<HTMLDivElement>(null);

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

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#f1f5f9";
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height);
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.stroke();
  };

  return (
    <div className={classes["block-container"]} ref={blockRef}>
      <Canvas draw={draw} width={blockRef.current?.clientWidth || 250} />
      <div className={classes["block-box"]}>
        {isEditing ? (
          <input
            type="text"
            disabled={!isEditing}
            value={state.name}
            onChange={handleEdit}
            placeholder="Category name"
            className={classes["block-box--input"]}
          />
        ) : (
          <p className={classes["block-box--name"]}>{state.name}&nbsp;</p>
        )}
        <div className={classes["block-actions"]}>
          {!isEditing && <WidgetButton variant="plus" className="m-1 ml-2" onClick={handleAdd} />}
          {type === "sub" && (
            <WidgetButton variant={!isEditing ? "pen" : "check"} className="m-1" onClick={handleEditingMode} />
          )}
          {type === "sub" && <WidgetButton variant="close" className="m-1" onClick={onRemove} />}
        </div>
      </div>
      <div className="flex">
        {state.subLevel.map(({ id, level }) => (
          <Block
            key={id}
            type="sub"
            initialValue={{ level, name: "" }}
            isInitialEditing={true}
            onRemove={handleRemove.bind(null, id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Block;
