import { useState } from "react";
import classes from "./Block.module.css";
import WidgetButton from "../base/WidgetButton";
import { ChangeEvent } from "react";
import type { State as S } from "./MainBlock";

interface SubBlockProps {
  id: string;
  level: number;
  name: string;
  onEditName: (blockLevel: number, blockId: string, newName: string) => void;
  onRemove: () => void;
  onAddSubBlock: () => void;
  subLevel: S[];
}

function SubBlock({ id, level, name, onEditName, onRemove, onAddSubBlock, subLevel }: SubBlockProps) {
  const [blockName, setBlockName] = useState(name);

  function handleChangeBlockName(event: ChangeEvent<HTMLInputElement>) {
    setBlockName(event.target.value);
  }
  function handleEditName(blockLevel: number, blockd: string, newName: string) {
    if(blockLevel === level) { 
      onEditName( level, id, blockName);
    } else {
      onEditName( blockLevel, blockd, newName);
    }
  }
  function handleRemove() {
    onRemove();
  }
  function handleAddSubBlock() {
    onAddSubBlock()
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
        <WidgetButton variant="close" className="m-1" onClick={handleRemove} />
        <WidgetButton variant="check" className="m-1" onClick={handleEditName.bind(null, level, id, '')} />

        <WidgetButton variant="pen" className="m-1" />

        <WidgetButton variant="plus" className="m-1" onClick={handleAddSubBlock} />
      </div>
      <div>
        {subLevel.map(({ id, level, name, subLevel }) => (
          <SubBlock
            key={id}
            id={id}
            level={level}
            name={name}
            subLevel={subLevel}
            onEditName={handleEditName}
            onRemove={handleRemove}
            onAddSubBlock={handleAddSubBlock}
          />
        ))}
      </div>
    </div>
  );
}

export default SubBlock;
