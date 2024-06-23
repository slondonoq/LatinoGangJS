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
  // onDrop: (block: CodeBlock) => void;
  moveBlock:(id: string, atIndex: number) => void;
  findBlock:(id:string)=>{index:number};
}

const Playground: React.FC<PlaygroundProps>= ({blocks,moveBlock,findBlock}) => {
  // TODO: implement layout section

  const [,drop] = useDrop({
    accept: ItemTypes.BLOCK,
    drop:() =>{
      console.log("bloques en Playground:",blocks)

    }
    // drop: (block: CodeBlock) => {
    //   onDrop(block);
    // },
  });

  return(
      <section id="playground" ref={drop}>
        <img src={logo_no_bg} id='watermark'/>
        <p>Block stacking editor goes here</p>
        <div className="blocks" >
          {blocks.map((block) => (
            <div key={block.id}>
              <Block
                key={block.id}
                id={block.id}
                children={block.children}
                moveBlock = {moveBlock}
                findBlock = {findBlock}
              />
            </div>
          ))}
        </div>
      </section>
  )
  }

  export default Playground