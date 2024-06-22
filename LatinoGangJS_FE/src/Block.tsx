// Block.tsx
import { useDrag, DragSourceMonitor } from 'react-dnd';
// import {ItemTypes} from "@components/ItemTypes.tsx";
import {CodeBlock} from "@components/types.tsx";
import React from "react";

const Block: React.FC<CodeBlock> = ({ id,content,index }) => {
  const [, drag] = useDrag(() => ({
    type: "block",
    item: {id,content,index},
    collect: (monitor: DragSourceMonitor) => ({

      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} id={id} className="code-block">
      {content}
    </div>
  );
};

export default Block;
