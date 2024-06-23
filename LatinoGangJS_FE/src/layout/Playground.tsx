import '@assets/stylesheets/layout/Playground.css'
import logo_no_bg from '@assets/img/logo_no_background.png'

import {useDrop} from 'react-dnd'
import { v4 } from 'uuid'
import _ from 'lodash'
import { useState } from "react";
import {CodeBlock, Data, ElementsData} from "@components/types.tsx"

import Block from "../Block.tsx"
import {ItemTypes} from "@components/ItemTypes.tsx"
import BlockPlaceholder from '@components/BlockPlaceholder.tsx'

const Playground = () => {
  // TODO: implement layout section
  const [codeData, setCodeData] = useState<Data>({
    rootElems: [],
    sentence_relations: {}
  })

  const[elements, setElements] = useState<ElementsData>({})

  const [{ isOver },drop] = useDrop({

    accept: ItemTypes.BLOCK,
    drop: (block: CodeBlock) => {
      if(isOver) {
        onDrop(block);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    })
  });

  const onDrop = async (block: CodeBlock, blockParent?: string, changeRoot?: boolean) => {
    if(block.id && elements[block.id]) {
      if ((blockParent !== block.id)) {
        await moveElem(block, blockParent, changeRoot)
      }
    }
    else {
      const newData: Data = await createElem(block, blockParent, changeRoot)
      setCodeData(newData)
    }
  }

  const createElem = async (block: CodeBlock, blockParent?: string, changeRoot?: boolean) => {
    const newId = v4()
    const newData: Data = _.cloneDeep(codeData)
    

    if(!blockParent) {
      newData.rootElems = newData.rootElems.concat([newId]),
      newData.sentence_relations[newId] = {
        sent_parent: undefined,
        sent_child: undefined
      }
    }
    else{
      if(changeRoot) {
        const currentRootIndex: number = codeData.rootElems.findIndex(elem => elem == blockParent)
        if (currentRootIndex != -1) {
          newData.rootElems = newData.rootElems.slice(0, currentRootIndex)
            .concat([newId]).concat(newData.rootElems.slice(currentRootIndex+1))
          
          // Setting previous root parent elem
          newData.sentence_relations[blockParent].sent_parent = newId
          // Seting new elem relations
          newData.sentence_relations[newId] = {
            sent_parent: undefined,
            sent_child: blockParent
          }
        }
      }
      else {
        const oldSentenceChild = newData.sentence_relations[blockParent].sent_child
        //Setting parent for child
        newData.sentence_relations[newId] = {
          sent_child: oldSentenceChild,
          sent_parent: blockParent
        }
        //Setting child for parent
        newData.sentence_relations[blockParent].sent_child = newId
      }
    }
    setElements({
      ...elements,
      [newId]: <>{block.content}</>
    })
    return newData
  }

  const moveElem = async (block: CodeBlock, newBlockParent?: string, changeRoot?: boolean) => {
    const newData: Data = _.cloneDeep(codeData)

    // Deleting block from previous relation
    if (newData.rootElems.findIndex(elem => elem == block.id) != -1) {
      //Elem is another root
      newData.rootElems = newData.rootElems.filter(elem => elem != block.id)
    }
    else {
      //Elem is not a root
      const previousBlockParent = newData.sentence_relations[block.id ?? ''].sent_parent
      newData.sentence_relations[previousBlockParent ?? ''].sent_child = undefined
    }

    // Finding current block's end
    let currentBlockEnd = block.id
    while (newData.sentence_relations[currentBlockEnd ?? ''].sent_child) {
      currentBlockEnd = newData.sentence_relations[currentBlockEnd ?? ''].sent_child
    }
    
    // Now change remaining relations
    if(changeRoot) {
      
      const currentRootIndex: number = newData.rootElems.findIndex(elem => elem == newBlockParent)
      if (currentRootIndex != -1) {
        // Adding old root to the end of block
        newData.sentence_relations[currentBlockEnd ?? ''].sent_child = newBlockParent

        newData.rootElems = newData.rootElems.slice(0, currentRootIndex)
          .concat([block.id ?? '']).concat(newData.rootElems.slice(currentRootIndex+1))
        
        // Setting previous root relations
        newData.sentence_relations[newBlockParent ?? ''].sent_parent = currentBlockEnd
        // Seting new elem relations
        newData.sentence_relations[block.id ?? ''].sent_parent = undefined
      }
    }
    else if (newBlockParent) {
      //Save parent's previous child
      const oldChild = newData.sentence_relations[newBlockParent].sent_child
      // Change relations
      newData.sentence_relations[newBlockParent].sent_child = block.id
      newData.sentence_relations[block.id ?? ''].sent_parent = newBlockParent
      newData.sentence_relations[currentBlockEnd ?? ''].sent_child = oldChild
      newData.sentence_relations[oldChild ?? ''].sent_parent = currentBlockEnd
    }
    else {
      // This option is left here in case we plan to allow x,y movement of pieces
      newData.rootElems = newData.rootElems.concat([block.id ?? ''])
    }
    setCodeData(newData)

    return newData
  }


  const renderElem = (elemId: string) => (
    <>
      <Block id={elemId} key={elemId} content={
        <>
          {elements[elemId].props?.children}
          <BlockPlaceholder
            key={`placeholder-${elemId}`}
            isReduced={Boolean(codeData.sentence_relations[elemId].sent_child)}
            onDrop={(block: CodeBlock)=> onDrop(block, elemId)}
          />
          {
            codeData.sentence_relations[elemId].sent_child 
              ? renderElem(codeData.sentence_relations[elemId].sent_child ?? '') 
              : null}
        </>
      }/>
    </>
  )

  return(
      <section id="playground">
        <img src={logo_no_bg} id='watermark'/>
        <div className="blocks" ref={drop}>
          {
            codeData.rootElems.map(elemId => 
              <div key={`rootContainer-${elemId}`}>
                <BlockPlaceholder
                  key={`root-${elemId}`}
                  onDrop={(block: CodeBlock) => onDrop(block, elemId, true)} 
                />
                {renderElem(elemId)}
              </div>
            )
          }
        </div>
      </section>
  )
}

  export default Playground