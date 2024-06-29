import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlock } from "@components/types.tsx";
import { ItemTypes } from "@components/ItemTypes.tsx";
import { useDrop } from "react-dnd";
import { ReactNode } from "react";

const AssignBlock = ({ nested1, nested2, onDrop }) => {
  const [{ isOver },drop] = useDrop({

    accept: [ItemTypes.BLOCK, ItemTypes.SENTENCE],
    drop: (block: CodeBlock) => {
      if(isOver) {
        onDrop(block);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    })
    
  });


  return (
    <span className="block block__assign block__sentence">
      {nested1 ?? <BlockPlaceholder placeholderText={"variable"} />}
      <input type="hidden" value="=" />=
      {nested2 ?? (
        <BlockPlaceholder
          placeholderText={"valor"}
          itemsTypes={[ItemTypes.SENTENCE]}
          onDrop={(block: CodeBlock) => {
            console.log("Dropped block", block);
            //onDrop(block);
          }
        }
        />
      )}
    </span>
  );
};

export default AssignBlock;
