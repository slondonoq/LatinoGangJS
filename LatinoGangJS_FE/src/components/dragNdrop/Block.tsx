// Block.tsx
import { useDrag, DragSourceMonitor } from 'react-dnd';
// import {ItemTypes} from "@components/ItemTypes.tsx";
import {CodeBlock} from "@components/types.tsx";
import React from "react";
import {ItemTypes} from "@components/ItemTypes.tsx";

const Block: React.FC<CodeBlock> = ({ id,content,index, delFunction, replaceFunction }) => {
  // const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BLOCK,
    item: {id,content,index, delFunction, replaceFunction},
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} id={id} className={`code-block ${isDragging && 'code-block--dragged'}`}>
      {content}
      {/* TODO: fin block separation can go here when diff block types are defined */}
    </div>
  );
};

export default Block;
