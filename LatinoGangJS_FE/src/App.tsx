import '@assets/stylesheets/App.css'
import '@assets/stylesheets/components/CodeBlocks.css'


import update from 'immutability-helper'
import Playground from '@layout/Playground'
import CodeBlockSelection from '@layout/CodeBlocksSelection'
import CodeOutput from '@layout/CodeOutput'
import TopBar from '@layout/TopBar'
import {useCallback, useState} from "react";
import {CodeBlock} from "@components/types.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { v4 } from 'uuid';
import AssignBlock from "@components/variables/AssignBlock.tsx";
import ForBlock from "@components/iterators/ForBlock.tsx";
// import {BlockProps} from "@components/types.tsx";

const ITEMS:CodeBlock[] = [
  {
    id:v4(),
    children:<AssignBlock></AssignBlock>
  },
  {
    id:v4(),
    children:<AssignBlock></AssignBlock>
  },
  {
    id:v4(),
    children:<AssignBlock></AssignBlock>
  },
  {
    id:v4(),
    children:<AssignBlock></AssignBlock>
  },
  {
    id:v4(),
    children:<AssignBlock></AssignBlock>
  },
  {
    id:v4(),
    children:<ForBlock></ForBlock>
  }
]

function App() {
  const [blocks, setBlocks] = useState<CodeBlock[]>(ITEMS);

  // Eliminación de bloques
  const handleRemoveBlock = (id?: string) => {
    if (id !== undefined){
      setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
    }
    console.log(id,blocks)
  };

  const findBlock = (id: string):{block:CodeBlock|undefined, index:number}=>{
    const index = blocks.findIndex((block) => block.id === id);
    const block = blocks[index]

    return {
      block,
      index
    }
  }

  //Agregar o Modificar bloque
  // const handleAddOrUpdateBlock = (block: CodeBlock) => {
  //   setBlocks((prevBlocks) => {
  //     const blockIndex = prevBlocks.findIndex(b => b.id === block.id);
  //     console.log(blocks)
  //     if (blockIndex === -1) {
  //       return [...prevBlocks, { ...block, id:v4(), index: prevBlocks.length }];
  //     }
  //     return prevBlocks
  //   });
  // };

  const moveBlock = useCallback(
    (id:string, atIndex: number) => {
      const {block, index} = findBlock(id)
      console.log(block,index,atIndex)
      if(block!==undefined && index !==-1){
        setBlocks(
          update(blocks, {
            $splice:[
              [index,1],
              [atIndex,0,block]
            ],
          }),
        )
        console.log("bloques en APP:",blocks)
      }
    },[findBlock,blocks,setBlocks],
  )




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
        <CodeBlockSelection onDrop={handleRemoveBlock} findBlock={findBlock} moveBlock={moveBlock}/>
        <Playground blocks={blocks} moveBlock={moveBlock} findBlock={findBlock} />
        <CodeOutput />
      </DndProvider>
    </>
  )
}

export default App
