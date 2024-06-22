import '@assets/stylesheets/layout/Playground.css'
import logo_no_bg from '@assets/img/logo_no_background.png'

import {useDrop, DropTargetMonitor, DndProvider} from 'react-dnd';
import React, {useState} from "react";
import {CodeBlock} from "@components/types.tsx";
import {HTML5Backend} from "react-dnd-html5-backend";
import Block from "../Block.tsx";
// import {ItemTypes} from "@components/ItemTypes.tsx";



const Playground: React.FC= () => {
  // TODO: implement layout section
  const [blocks, setBlocks] = useState<CodeBlock[]>([]);

  // const moveBlock = (dragIndex: number, dropIndex: number) => {
  //   const updatedBlocks = [...blocks];
  //   const draggedBlock = updatedBlocks[dragIndex];
  //
  //   // Remove the dragged block from its current position
  //   updatedBlocks.splice(dragIndex, 1);
  //
  //   // Insert the dragged block at the dropped index
  //   updatedBlocks.splice(dropIndex, 0, draggedBlock);
  //
  //   setBlocks(updatedBlocks);
  // };

  const [,drop] = useDrop({

    accept: "block",
    drop: (block: CodeBlock, monitor: DropTargetMonitor) => {
      console.log(monitor.didDrop())
      if (monitor.didDrop()) {
        return;
      }

      console.log(blocks)
      if (block.index === undefined){
        setBlocks([...blocks, {index:blocks.length+1,id:`block-${blocks.length+1}`,content:block.content}])
      }else{
        console.log("no undefined")
        // TODO creat moveBlock logic
      }

    },
  });

  return(
    <DndProvider backend={HTML5Backend}>
      <section id="playground" ref={drop}>
        <img src={logo_no_bg} id='watermark'/>
        <p>Block stacking editor goes here</p>
        <div className="blocks" >
          {blocks.map((block, index) => (
            <div key={index}>
              <Block
                id={block.id}
                content={block.content}
                index = {block.index}
              />
            </div>
          ))}
        </div>
      </section>
    </DndProvider>
  )
  }

  export default Playground