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
  moveBlock:(dragIndex: number, hoverIndex: number) => void;
}

const Playground: React.FC<PlaygroundProps>= ({blocks,onDrop,moveBlock}) => {
  // TODO: implement layout section

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
            <div key={block.id}>
              <Block
                id={block.id}
                children={block.children}
                index = {index}
                moveBlock = {moveBlock}
              />
            </div>
          ))}
        </div>
      </section>
  )
  }

  export default Playground