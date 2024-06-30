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

  const onDrop = (
    block: CodeBlock,
    blockParent?: string,
    changeRoot?: boolean,
    embedding_spot?: string,
    is_nested?: boolean
  ) => {
    if (block.id && elements[block.id]) {
      if (blockParent !== block.id) {
        moveElem(block, blockParent, changeRoot, embedding_spot);
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

      console.log(blockId, newData.inputs);
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
      newData.nested_relations[blockParent ?? ''] = {
        nested_child: newId
      }
      newData.nested_relations[block.id ?? ''] = {
        nested_parent: blockParent
      }
      newData.sentence_relations[newId] = {
        sent_parent: undefined,
        sent_child: undefined,
      };
    }
    else if (block.blockTypes.includes("embedded")) {
      if (!blockParent) {
        newData.rootElems = newData.rootElems.concat([newId]);
      } else if (!newData.embedded_relations[blockParent]) {
        // TODO, somehow send the key
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
    } else if (!blockParent) {
      newData.rootElems = newData.rootElems.concat([newId]);
      newData.sentence_relations[newId] = {
        sent_parent: undefined,
        sent_child: undefined,
      };
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
    //console.log(block)
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
    embedding_spot?: string
  ) => {
    const newData: Data = _.cloneDeep(codeData);
    // Deleting block from previous relation
    if (newData.rootElems.findIndex((elem) => elem == block.id) != -1) {
      //Elem is another root
      newData.rootElems = newData.rootElems.filter((elem) => elem != block.id);
    }
    else {
      //Elem is not a root
      if (block.typeOfBlock === "embedded") {
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

      } else {
        const previousBlockParent =
          newData.sentence_relations[block.id ?? ""].sent_parent;
        newData.sentence_relations[previousBlockParent ?? ""].sent_child =
          undefined;
      }
    }
    if (block.typeOfBlock === "embedded") {
      if (newBlockParent) {
        newData.embedded_relations[newBlockParent ?? ""] = {
          ...newData.embedded_relations[newBlockParent ?? ""],
          [embedding_spot ?? ""]: block.id,
        };
      }
      newData.embedded_relations[block.id ?? ""].emb_parent = newBlockParent;
    } else {
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
    } else {
      if (blockRootIndex != -1) {
        //Is root
        newData.rootElems = newData.rootElems
          .slice(0, blockRootIndex)
          .concat(newData.rootElems.slice(blockRootIndex + 1));
      } else {
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
        />
        <CodeOutput />
      </DndProvider>
    </>
  );
}

export default App;
