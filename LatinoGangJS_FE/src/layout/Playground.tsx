import '@assets/stylesheets/layout/Playground.css'
import logo_no_bg from '@assets/img/logo_no_background.png'

import {useDrop} from 'react-dnd';
import React from "react";
import {CodeBlock} from "@components/types.tsx";

import Block from "../Block.tsx";
import {ItemTypes} from "@components/ItemTypes.tsx";
// import {ItemTypes} from "@components/ItemTypes.tsx";

interface PlaygroundProps {
  blocks: CodeBlock[];
  onDrop: (block: CodeBlock) => void;
}

const Playground: React.FC<PlaygroundProps>= ({blocks,onDrop}) => {
  // TODO: implement layout section


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

    accept: ItemTypes.BLOCK,
    drop: (block: CodeBlock) => {
      onDrop(block);
    },
  });

  return(
      <section id="playground" ref={drop}>
        <img src={logo_no_bg} id='watermark'/>
        <p>Block stacking editor goes here</p>
        <div className="blocks" >
          {blocks.map((block, index) => (
            <div key={index}>
              <Block
                id={block.id}
                content={block.content}
                index = {index}
              />
            </div>
          ))}
        </div>
      </section>
  )
  }

  export default Playground