import '@assets/stylesheets/App.css'
import '@assets/stylesheets/components/CodeBlocks.css'
import Playground from '@layout/Playground'
import CodeBlockSelection from '@layout/CodeBlocksSelection'
import CodeOutput from '@layout/CodeOutput'
import TopBar from '@layout/TopBar'
import {useState} from "react";
import {CodeBlock} from "@components/types.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
// import {BlockProps} from "@components/types.tsx";

function App() {
  const [blocks, setBlocks] = useState<CodeBlock[]>([]);

  // Eliminación de bloques
  const handleRemoveBlock = (id?: string) => {
    if (id !== undefined){
      setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
    }
  };

  //Agregar o Modificar bloque
  const handleAddOrUpdateBlock = (block: CodeBlock) => {
    setBlocks((prevBlocks) => {
      const blockIndex = prevBlocks.findIndex(b => b.id === block.id);
      if (blockIndex !== -1) {
        const updatedBlocks = [...prevBlocks];
        updatedBlocks[blockIndex] = block;
        return updatedBlocks;
      } else {
        return [...prevBlocks, { ...block, id:"block"+prevBlocks.length, index: prevBlocks.length }];
      }
    });
  };




  // const handleDrop = (item: {type:string}) => {
  //   const newBlock :BlockProps= {id:`block-${blocks.length + 1}`,index : blocks.length + 1,type : item.type}
  //   setBlocks((blocks: BlockProps[]) => [...blocks, newBlock]);
  //   console.log(newBlock)
  // };
  //
  // const handleRemove = (id: string) => {
  //   setBlocks((blocks) => blocks.filter((block) => block.id !== id));
  //   console.log(id)
  // };


  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <TopBar />
        <CodeBlockSelection onDrop={handleRemoveBlock}/>
        <Playground />
        <CodeOutput />
      </DndProvider>
    </>
  )
}

export default App
