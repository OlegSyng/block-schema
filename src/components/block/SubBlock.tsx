import { useState } from "react";
import classes from "./Block.module.css";
import WidgetButton from "../base/WidgetButton";
import { ChangeEvent } from "react";
import type { State as S } from "./MainBlock";

interface SubBlockProps {
  level: number;
  name: string;
  onEditName: (name: string) => void;
  onRemove: () => void;
  subLevel: S[];
}

function SubBlock({ level, name, onEditName, onRemove, subLevel }: SubBlockProps) {
  const [blockName, setBlockName] = useState(name);

  function handleChangeBlockName(event: ChangeEvent<HTMLInputElement>) {
    setBlockName(event.target.value);
  }
  function handleEditBlockName() {
    onEditName(blockName);
  }
  function handleRemoveBlock() {
    onRemove();
  }

  return (
    <div className="flex items-center">
      <div className={classes.container}>
        <input
          type="text"
          value={blockName}
          onChange={handleChangeBlockName}
          placeholder="Category name"
          className={classes.input}
        />
      </div>
      <div>
        <WidgetButton variant="close" className="m-1" onClick={handleRemoveBlock} />
        <WidgetButton variant="check" className="m-1" onClick={handleEditBlockName} />
      </div>
    </div>
  );
}

export default SubBlock;
