// Block.tsx
import { useDrag, DragSourceMonitor } from 'react-dnd';
// import {ItemTypes} from "@components/ItemTypes.tsx";
import {CodeBlock} from "@components/types.tsx";
import React from "react";
import {ItemTypes} from "@components/ItemTypes.tsx";

const Block: React.FC<CodeBlock> = ({ id,content,index }) => {
  // const ref = useRef<HTMLDivElement>(null)
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BLOCK,
    item: {id,content,index},
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // hover(item:CodeBlock,monitor:DragSourceMonitor){
    //   if (!ref.current) {
    //     return
    //   }
    //   const dragIndex = item.index
    //   const hoverIndex = index
    //
    //   if (dragIndex === hoverIndex) {
    //     return
    //   }
    //
    //   const hoverBoundingRect = ref.current?.getBoundingClientRect()
    //   const hoverMiddleY =
    //     (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    //
    //   const clientOffset = monitor.getClientOffset()
    //
    //   const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
    // }
  }));

  return (
    <div ref={drag} id={id} className="code-block">
      {content}
    </div>
  );
};

export default Block;
