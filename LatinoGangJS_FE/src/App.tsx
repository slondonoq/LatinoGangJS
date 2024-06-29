import '@assets/stylesheets/App.css'
import '@assets/stylesheets/components/CodeBlocks.css'
import Playground from '@layout/Playground'
import CodeBlockSelection from '@layout/CodeBlocksSelection'
import CodeOutput from '@layout/CodeOutput'
import TopBar from '@layout/TopBar'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
// import {useDrop} from 'react-dnd'
import { v4 } from 'uuid'
import _ from 'lodash'
import { useState } from "react";
import {CodeBlock, Data, ElementsData} from "@components/types.tsx"
import { ItemTypes } from '@components/ItemTypes'
// import {BlockProps} from "@components/types.tsx";

function App() {
  

  const [codeData, setCodeData] = useState<Data>({
    rootElems: [],
    sentence_relations: {},
    nested_relations: {}  
  })

  const[elements, setElements] = useState<ElementsData>({})

  const onDrop = (block: CodeBlock, blockParent?: string, changeRoot?: boolean, type?:string) => {
    if(block.id && elements[block.id]) {
      if ((blockParent !== block.id)) {
        moveElem(block, blockParent, changeRoot)
      }
    }
    else {
      createElem(block, blockParent, changeRoot)
    }
  }

  const createElem = (block: CodeBlock, blockParent?: string, changeRoot?: boolean, type?:string) => {
    console.log('Creating elem')
    const newId = v4()
    const newData: Data = _.cloneDeep(codeData)
    if (type === 'nested') {
      //logic for sentence
      console.log('Sentence')
    }

    if(!blockParent) {
      console.log('No parent')
      newData.rootElems = newData.rootElems.concat([newId])
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
        console.log(newData.sentence_relations[newId])
        //Setting child for parent
        newData.sentence_relations[blockParent].sent_child = newId
      }
    }
    setElements({
      ...elements,
      [newId]: <>{block.content}</>
    })
    setCodeData(newData)
    console.log(elements, codeData)
  }

  const moveElem = (block: CodeBlock, newBlockParent?: string, changeRoot?: boolean) => {
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
      oldChild ? newData.sentence_relations[oldChild ?? ''].sent_parent = currentBlockEnd:null
    }
    else {
      // This option is left here in case we plan to allow x,y movement of pieces
      newData.rootElems = newData.rootElems.concat([block.id ?? ''])
    }

   /*  const nestedBlock = Object.keys(codeData.nested_relations).filter(key => codeData.nested_relations[key] === block.id)
 */

    setCodeData(newData)

    return newData
  }

  const deleteElem = (block: CodeBlock) => {
    const newData: Data = _.cloneDeep(codeData)

    const blockRootIndex: number = newData.rootElems.findIndex(elem => elem == block.id)
    if (blockRootIndex != -1) {
      //Is root
      newData.rootElems = newData.rootElems.slice(0, blockRootIndex)
        .concat(newData.rootElems.slice(blockRootIndex+1))
    }
    else {
      //Remove child relation from parent
      const parentElem: string | undefined = newData.sentence_relations[block.id ?? ''].sent_parent
      newData.sentence_relations[parentElem ?? ''].sent_child = undefined
    }
    //Deleting sentence relations
    let currentElemId = block.id
    const idsToRemove: string[] = [block.id ?? '']
    while (newData.sentence_relations[currentElemId ?? ''].sent_child) {
      const child = newData.sentence_relations[currentElemId ?? ''].sent_child
      idsToRemove.push(child ?? '')
      currentElemId = child
    }
    newData.sentence_relations = _.omit(newData.sentence_relations, idsToRemove)
    // Remove dangling elems
    const newElems: ElementsData = _.omit(elements, idsToRemove)

    setElements(newElems)
    setCodeData(newData)
  }


  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <TopBar />
        <CodeBlockSelection onDrop={deleteElem}/>
        <Playground codeData={codeData} elements={elements} onDrop={onDrop}/>
        <CodeOutput />
      </DndProvider>
    </>
  )
}

export default App
