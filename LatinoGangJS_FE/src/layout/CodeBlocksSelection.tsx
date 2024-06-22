import '@assets/stylesheets/layout/CodeBlocksSelection.css'
import NumericTerminalBlock from '@components/terminal/NumericTerminalBlock'

import { useDrop } from 'react-dnd';
import Block from "../Block.tsx";
import React from "react";
import {ItemTypes} from "../ItemTypes.tsx";
import {BlockProps} from "../types.tsx";

interface CodeBlockSelectionProps {
  onRemove: (index: BlockProps["id"] ) => void;
}

const CodeBlockSelection:React.FC<CodeBlockSelectionProps> = ({onRemove}) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK, // Aceptar elementos del tipo ItemTypes.BLOCK
    drop: (item: BlockProps) => {
      onRemove(item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  // TODO: implement layout section
  return(
    <section id="block-selection" ref={drop}>

      <p>Code blocks go here</p>
      <NumericTerminalBlock/>
      <div>
        <h3>Available Blocks</h3>
        <Block id ="" type="Move" index={-1}/>
        <Block id ="" type="Turn" index={-1}/>
        <Block id ="" type="Jump" index={-1}/>
      </div>
    </section>
  )
}

export default CodeBlockSelection