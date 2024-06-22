import '@assets/stylesheets/layout/Playground.css'
import logo_no_bg from '@assets/img/logo_no_background.png'

import { useDrop, DropTargetMonitor } from 'react-dnd';
import React from "react";
import {ItemTypes} from "../ItemTypes.tsx";
import Block from "../Block.tsx";
import {BlockProps} from "../types.tsx";

interface BlockStackingEditorProps {
  onDrop: (item: BlockProps) => void;
  blocks: BlockProps[];
}

const Playground: React.FC<BlockStackingEditorProps>= ({ onDrop, blocks }) => {
  // TODO: implement layout section
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK,
    drop: (item: BlockProps) => {
      onDrop(item);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return(
    <section id="playground">
      <img src={logo_no_bg} id='watermark'/>
      <p>Block stacking editor goes here</p>
      <div
        ref={drop}
        style={{
          height: '400px',
          width: '100%',
          border: '1px solid black',
          backgroundColor: isOver ? 'lightgreen' : 'white',
        }}
      >
        <div>
          {blocks.map((block, index) => (
              <Block id={block.id} key={block.id} type={block.type} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Playground