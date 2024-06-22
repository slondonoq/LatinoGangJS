// Block.tsx
import {useDrag, useDrop} from 'react-dnd';
// import {ItemTypes} from "@components/ItemTypes.tsx";
import {CodeBlock} from "@components/types.tsx";
import React, {useRef} from "react";
import {ItemTypes} from "@components/ItemTypes.tsx";

interface BlockProps extends CodeBlock {
  moveBlock?: (dragIndex: number, hoverIndex: number) => void;
}

const Block: React.FC<BlockProps> = ({children, id,index ,moveBlock})  => {
  const ref = useRef<HTMLDivElement>(null)
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BLOCK,
    item: {id,children,index},
  }));

  const [, drop] = useDrop({
    accept: ItemTypes.BLOCK,
    hover(item: CodeBlock, monitor) {
      if (!ref.current || item.index == undefined || index == undefined ||moveBlock==undefined) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the item's height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveBlock(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  drag(drop(ref))

  return (
    <div ref={ref} id={id} className="code-block">
      {children}
    </div>
  );
};

export default Block;
