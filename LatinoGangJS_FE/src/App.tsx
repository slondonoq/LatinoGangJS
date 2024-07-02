import "@assets/stylesheets/App.css";
import "@assets/stylesheets/components/CodeBlocks.css";
import Playground from "@layout/Playground";
import CodeBlockSelection from "@layout/CodeBlocksSelection";
import CodeOutput from "@layout/CodeOutput";
import TopBar from "@layout/TopBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 } from "uuid";
import _ from "lodash";
import { useState } from "react";
import {
  CodeBlock,
  Data,
  ElementsData,
} from "@components/types.tsx";
import {processText} from "./api/api.tsx";

function App() {
  const [codeData, setCodeData] = useState<Data>({
    rootElems: [],
    sentence_relations: {},
    embedded_relations: {},
    nested_relations: {},
    has_translation_block: false,
    inputs: {}
  });

  const [elements, setElements] = useState<ElementsData>({});
  const [codeLatino, setCodeLatino] = useState("funcion fib(n)\n    a,b = 0,1\n    mientras a < n\n        a,b = b, a+b\n        escribir(a)\n        /* uwu */\n    fin\nfin\n\nfib(250)");
  const [codeJs, setCodeJs] = useState('');

  const onDrop = (
    block: CodeBlock,
    blockParent?: string,
    changeRoot?: boolean,
    embedding_spot?: string,
    is_nested?: boolean
  ) => {
    if (block.id && elements[block.id]) {
      if (blockParent !== block.id) {
        moveElem(block, blockParent, changeRoot, embedding_spot, is_nested);
      }
    } else if (block.name !== "code_start" || !codeData.has_translation_block) {
      createElem(block, blockParent, changeRoot, embedding_spot, is_nested);
    } else {
      alert("Solo se puede tener un bloque de inicio");
    }
  };
  const handleInput = (
    block:CodeBlock,
    pos:number,
    inputValue:string,
  ) =>{
    setCodeData(prevData => {
      const newData: Data = _.cloneDeep(prevData);
      const blockId = block.id ?? '';

      if (!newData.inputs[blockId]) {
        newData.inputs[blockId] = [];
      }

      newData.inputs[blockId][pos] = inputValue;

      // console.log(blockId, newData.inputs);
      return newData;
    });
  }

  const createElem = (
    block: CodeBlock,
    blockParent?: string,
    changeRoot?: boolean,
    embedding_spot?: string,
    is_nested?: boolean
  ) => {
    const newId = v4();
    const newData: Data = _.cloneDeep(codeData);
    if (block.name === "code_start") {
      newData.has_translation_block = true;
    }
    if(is_nested) {
      console.log('nested')
      if(!newData.nested_relations[blockParent ?? '']) {
        newData.nested_relations[blockParent ?? ''] = {
          nested_child: undefined,
          nested_parent: undefined
        }
      }

      newData.nested_relations[blockParent ?? ''].nested_child = newId
      
      newData.nested_relations[newId] = {
        nested_parent: blockParent
      }

      newData.sentence_relations[newId] = {
        sent_parent: undefined,
        sent_child: undefined,
      };
    }
    else if (block.blockTypes.includes("embedded")) {
      if (!blockParent) {
        //newData.rootElems = newData.rootElems.concat([newId]); //WARNING: this causes that a embedded block can be alone in the playground
      } else if (!newData.embedded_relations[blockParent]) {
        if (blockParent && embedding_spot) {
          newData.embedded_relations[blockParent] = {
            emb_parent: undefined,
            [embedding_spot]: newId,
          };
        }
      } else {
        newData.embedded_relations[blockParent ?? ""] = {
          ...newData.embedded_relations[blockParent ?? ""],
          [embedding_spot ?? ""]: newId,
        };
      }
      newData.embedded_relations[newId ?? ""] = {
        emb_parent: blockParent,
      };
    } else if (!blockParent ) {
      if(block.blockTypes.includes("key_value") || block.blockTypes.includes("switch")|| block.blockTypes.includes("if_nesting")){
        console.log('Block can not be root')
      }
      else{
      newData.rootElems = newData.rootElems.concat([newId]);
      newData.sentence_relations[newId] = {
        sent_parent: undefined,
        sent_child: undefined,
      };
    }
    } else {
      if (changeRoot) {
        const currentRootIndex: number = codeData.rootElems.findIndex(
          (elem) => elem == blockParent
        );
        if (currentRootIndex != -1) {
          newData.rootElems = newData.rootElems
            .slice(0, currentRootIndex)
            .concat([newId])
            .concat(newData.rootElems.slice(currentRootIndex + 1));

          // Setting previous root parent elem
          newData.sentence_relations[blockParent].sent_parent = newId;
          // Seting new elem relations
          newData.sentence_relations[newId] = {
            sent_parent: undefined,
            sent_child: blockParent,
          };
        }
      } else {
        
        const oldSentenceChild =
          newData.sentence_relations[blockParent].sent_child;
        //Setting parent for child
        newData.sentence_relations[newId] = {
          sent_child: oldSentenceChild,
          sent_parent: blockParent,
        };
        //Setting child for parent
        newData.sentence_relations[blockParent].sent_child = newId;
      }
    }
    newData.inputs[newId] = [];
    setElements({
      ...elements,
      [newId]: { ...block, id: newId },
    });
    setCodeData(newData);
  };

  const moveElem = (
    block: CodeBlock,
    newBlockParent?: string,
    changeRoot?: boolean,
    embedding_spot?: string,
    is_parent_nested?: boolean,
  ) => {
    const newData: Data = _.cloneDeep(codeData);
    // Deleting block from previous relation
    if (newData.rootElems.findIndex((elem) => elem == block.id) != -1) {
      //Elem is another root
      newData.rootElems = newData.rootElems.filter((elem) => elem != block.id);
    }
    //Elem is not a root
    else if (block.blockTypes.includes("embedded")) {
      const previousEmbParent =
        newData.embedded_relations[block.id ?? ""].emb_parent;
        let currentKey;
        if (
          newData.embedded_relations[previousEmbParent ?? ""].emb_child_1 == block.id
        ) {
          currentKey = "emb_child_1";
        } else if (
          newData.embedded_relations[previousEmbParent ?? ""].emb_child_2 == block.id
        ) {
          currentKey = "emb_child_2";
        } else if (
          newData.embedded_relations[previousEmbParent ?? ""].emb_child_3 == block.id
        ) {
          currentKey = "emb_child_3";
        }
        newData.embedded_relations[previousEmbParent ?? ""] = {
          ...newData.embedded_relations[previousEmbParent ?? ""],
          [currentKey ?? ""]: undefined,
        };

    } 
    else if(newData.nested_relations[block.id ?? ''].nested_parent) {
      const previousNestedParent = newData.nested_relations[block.id ?? ''].nested_parent
      newData.nested_relations[previousNestedParent ?? ''].nested_child = undefined
      newData.nested_relations[block.id ?? ''].nested_parent = undefined
    }
    else {
      const previousBlockParent =
        newData.sentence_relations[block.id ?? ""].sent_parent;

      if(newData.sentence_relations[previousBlockParent ?? ""]) {
        newData.sentence_relations[previousBlockParent ?? ""].sent_child =
          undefined;
      }
    }

    if (block.blockTypes.includes("embedded")) {
      if (newBlockParent) {
        newData.embedded_relations[newBlockParent ?? ""] = {
          ...newData.embedded_relations[newBlockParent ?? ""],
          [embedding_spot ?? ""]: block.id,
        };
      }
      newData.embedded_relations[block.id ?? ""].emb_parent = newBlockParent;
    }
    else if(is_parent_nested) {
      
      if(!newData.nested_relations[newBlockParent ?? '']) {
        newData.nested_relations[newBlockParent ?? ''] = {
          nested_child: undefined,
          nested_parent: undefined
        }
      }

      if(!newData.nested_relations[block.id ?? '']) {
        newData.nested_relations[block.id ?? ''] = {
          nested_child: undefined,
          nested_parent: undefined
        }
      }

      newData.nested_relations[newBlockParent ?? ''].nested_child = block.id
      newData.nested_relations[block.id ?? ''].nested_parent = newBlockParent
    } 
    else {
      // Finding current block's end
      let currentBlockEnd = block.id;
      while (newData.sentence_relations[currentBlockEnd ?? ""].sent_child) {
        currentBlockEnd =
          newData.sentence_relations[currentBlockEnd ?? ""].sent_child;
      }

      // Now change remaining relations
      if (changeRoot) {
        const currentRootIndex: number = newData.rootElems.findIndex(
          (elem) => elem == newBlockParent
        );
        if (currentRootIndex != -1) {
          // Adding old root to the end of block
          newData.sentence_relations[currentBlockEnd ?? ""].sent_child =
            newBlockParent;

          newData.rootElems = newData.rootElems
            .slice(0, currentRootIndex)
            .concat([block.id ?? ""])
            .concat(newData.rootElems.slice(currentRootIndex + 1));

          // Setting previous root relations
          newData.sentence_relations[newBlockParent ?? ""].sent_parent =
            currentBlockEnd;
          // Seting new elem relations
          newData.sentence_relations[block.id ?? ""].sent_parent = undefined;
        }
      } else if (newBlockParent) {
        //Save parent's previous child
        const oldChild = newData.sentence_relations[newBlockParent].sent_child;
        // Change relations
        newData.sentence_relations[newBlockParent].sent_child = block.id;
        newData.sentence_relations[block.id ?? ""].sent_parent = newBlockParent;
        newData.sentence_relations[currentBlockEnd ?? ""].sent_child = oldChild;
        oldChild
          ? (newData.sentence_relations[oldChild ?? ""].sent_parent =
              currentBlockEnd)
          : null;
      } else {
        // This option is left here in case we plan to allow x,y movement of pieces
        newData.rootElems = newData.rootElems.concat([block.id ?? ""]);
      }
    }

    setCodeData(newData);

    return newData;
  };

  const deleteElem = (block: CodeBlock) => {
    // Return if block has no id
    if(!block.id) return

    const newData: Data = _.cloneDeep(codeData);

    if (block.name === "code_start") {
      newData.has_translation_block = false;
    }

    const blockRootIndex: number = newData.rootElems.findIndex(
      (elem) => elem == block.id
    );

    if (block.blockTypes.includes("embedded")) {
      if (newData.embedded_relations[block.id ?? ""]) {
        const parent = newData.embedded_relations[block.id ?? ""].emb_parent;
        if (parent) {
          const idToRemove: string = block.id ?? "";
          //Remove child from parent
          let currentKey;
          if (
            newData.embedded_relations[parent ?? ""].emb_child_1 == idToRemove
          ) {
            currentKey = "emb_child_1";
          } else if (
            newData.embedded_relations[parent ?? ""].emb_child_2 == idToRemove
          ) {
            currentKey = "emb_child_2";
          } else if (
            newData.embedded_relations[parent ?? ""].emb_child_3 == idToRemove
          ) {
            currentKey = "emb_child_3";
          }
          newData.embedded_relations[parent ?? ""] = {
            ...newData.embedded_relations[parent ?? ""],
            [currentKey ?? ""]: undefined,
          };
          delete newData.embedded_relations[block.id ?? ""];
          setCodeData(newData);

        }
      }
    }
    else {
      if (blockRootIndex != -1) {
        //Is root
        newData.rootElems = newData.rootElems
          .slice(0, blockRootIndex)
          .concat(newData.rootElems.slice(blockRootIndex + 1));
      }
      else if(newData.nested_relations[block.id ?? '']) {
        const prevParent: string = newData.nested_relations[block.id ?? ''].nested_parent ?? ''
        newData.nested_relations[prevParent].nested_child = undefined
        newData.nested_relations = _.omit(newData.nested_relations, [block.id])
      }
      else {
        //Remove child relation from parent
        const parentElem: string | undefined =
          newData.sentence_relations[block.id ?? ""].sent_parent;
        newData.sentence_relations[parentElem ?? ""].sent_child = undefined;
      }
      //Deleting sentence relations
      let currentElemId = block.id;
      const idsToRemove: string[] = [block.id ?? ""];
      while (newData.sentence_relations[currentElemId ?? ""].sent_child) {
        const child =
          newData.sentence_relations[currentElemId ?? ""].sent_child;
        idsToRemove.push(child ?? "");
        currentElemId = child ?? "";
      }
      newData.sentence_relations = _.omit(
        newData.sentence_relations,
        idsToRemove
      );
      // Remove dangling elems
      const newElems: ElementsData = _.omit(elements, idsToRemove);

      setElements(newElems);
      setCodeData(newData);
    }
  };

  const clearPlayground = () => {
    setElements({});
    setCodeData({
      rootElems: [],
      sentence_relations: {},
      embedded_relations: {},
      nested_relations: {},
      has_translation_block: false,
      inputs: {},
    });
  };

  const translate = async (event: SubmitEvent)=> {
    event.preventDefault()
    const form  = event.target as HTMLFormElement
    let unformatted_code: string = ''
    for (let i = 0; i < form.elements.length; i++) {
      const elem = form.elements[i]
      if (elem instanceof HTMLInputElement || elem instanceof HTMLSelectElement) {
        unformatted_code += elem.value + ' '
      }
    }
    //TODO: format code
    // console.log(unformatted_code)
    setCodeLatino(unformatted_code)
    await handleProcessText(unformatted_code)
  }

  const handleProcessText = async (latinoCode: string) => {
    try {
      const result = await processText(latinoCode);
      setCodeJs(result);
    } catch (error) {
      console.error("Failed to process text:", error);
    }
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <TopBar />
        <CodeBlockSelection onDrop={deleteElem} />
        <Playground
          codeData={codeData}
          elements={elements}
          onDrop={onDrop}
          clearPlayground={clearPlayground}
          handleInputs={handleInput}
          onFormSubmit={translate}
        />
        <CodeOutput codeLatino={codeLatino} codeJs={codeJs}/>
      </DndProvider>
    </>
  );
}

export default App;
