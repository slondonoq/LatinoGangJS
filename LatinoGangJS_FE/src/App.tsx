import '@assets/stylesheets/App.css'
import Playground from '@layout/Playground'
import CodeBlockSelection from '@layout/CodeBlocksSelection'
import CodeOutput from '@layout/CodeOutput'
import TopBar from '@layout/TopBar'
import DndContext from "./DndContext.tsx";
import { useState } from 'react';
import {BlockProps} from "./types.tsx";

function App() {
  const [blocks, setBlocks] = useState<BlockProps[]>([]);

  const handleDrop = (item: {type:string}) => {
    const newBlock :BlockProps= {id:`block-${blocks.length + 1}`,index : blocks.length + 1,type : item.type}
    setBlocks((blocks: BlockProps[]) => [...blocks, newBlock]);
    console.log(newBlock)
  };

  const handleRemove = (id: string) => {
    setBlocks((blocks) => blocks.filter((block) => block.id !== id));
    console.log(id)
  };


  return (
    <>
      <DndContext>
        <TopBar />
        <CodeBlockSelection onRemove={handleRemove}/>
        <Playground onDrop={handleDrop} blocks={blocks}/>
        <CodeOutput />
      </DndContext>
    </>
  )
}

export default App
