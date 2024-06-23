// Block.tsx
import {useDrag, useDrop,DragSourceMonitor} from 'react-dnd';

// import {ItemTypes} from "@components/ItemTypes.tsx";
import {CodeBlock} from "@components/types.tsx";
import React, {useRef} from "react";
import {ItemTypes} from "@components/ItemTypes.tsx";
// import {Identifier} from "dnd-core";

interface BlockProps extends CodeBlock {
  moveBlock: (id: string, atIndex: number) => void;
  findBlock:(id:string)=>{index:number};
}


const Block: React.FC<BlockProps> = ({children, id,moveBlock,findBlock})  => {
  const ref = useRef<HTMLDivElement>(null)

  // const [{handlerId}, drop] = useDrop<CodeBlock,void,{handlerId:Identifier|null}>({
  //   accept: ItemTypes.BLOCK,
  //   collect(monitor){
  //     return{
  //       handlerId: monitor.getHandlerId(),
  //     }
  //   },
  //   hover(item:CodeBlock, monitor) {
  //     if (!ref.current || item.index == undefined || index == undefined ||moveBlock==undefined) {
  //       return;
  //     }
  //
  //     const dragIndex = item.index;
  //     const hoverIndex = index;
  //     // Don't replace items with themselves
  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }
  //
  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //
  //     const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //
  //     const clientOffset = monitor.getClientOffset();
  //
  //     const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
  //
  //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //       return;
  //     }
  //
  //     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //       return;
  //     }
  //
  //     moveBlock(dragIndex, hoverIndex);
  //
  //     item.index = hoverIndex;
  //   }
  //
  // });

  const [,drop] = useDrop(
    ()=>({
      accept:ItemTypes.BLOCK,
      hover({id:draggedId}:CodeBlock){
        if (draggedId!==id && id !==undefined && draggedId!==undefined){
          const {index:overIndex} = findBlock(id)
          console.log(draggedId,overIndex)
          moveBlock(draggedId,overIndex)
        }
      }
    })
  )
  let originalIndex=undefined
  if(id!==undefined){
    originalIndex = findBlock(id).index
  }
  const [{isDragging}, drag] = useDrag(
    ()=>({
    type: ItemTypes.BLOCK,
    item: {id,children},
    collect:(monitor:DragSourceMonitor)=>({
      isDragging : monitor.isDragging()
    }),
    end: (item,monitor)=>{
      const {id:droppedId}= item
      const didDrop = monitor.didDrop()
      if (!didDrop && droppedId && originalIndex){
        moveBlock(droppedId,originalIndex)
      }
    }

  }));

  drag(drop(ref))
  const opacity = isDragging ? 0.5:1
  return (
    <div ref={ref} id={id} style={{ opacity}} className="code-block" >
      {children}
    </div>
  );
};

export default Block;
