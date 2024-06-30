// Block.tsx
import { useDrag, DragSourceMonitor } from 'react-dnd';
// import {ItemTypes} from "@components/ItemTypes.tsx";
import { CodeBlock } from "@components/types.tsx";
import React from "react";
import {ItemTypes} from "@components/ItemTypes.tsx";
import AssignBlock from '@components/variables/AssignBlock';
import FormBlock from '@components/FormBlock';
import BinaryLogicOperator from '@components/operators/BinaryLogicOperator';
import BinaryOperator from '@components/operators/BinaryOperator';

const Block: React.FC<CodeBlock> = ({ id, additional_content, name, typeOfBlock, embeddedBlock1, embeddedBlock2, embeddedBlock3, embeddedOnDrop ,handleInputs,inputs}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: typeOfBlock === 'embedded' ? ItemTypes.EMBEDDED : ItemTypes.BLOCK,
    item: {id, name, typeOfBlock },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const renderBlockByName = (name: string) => {
    if(name === 'code_start') {
      return <FormBlock />
    }
    else if(name === 'assignation') {
      return <AssignBlock embeddedBlock1={embeddedBlock1} embeddedBlock2={embeddedBlock2} embeddedOnDrop={embeddedOnDrop} handleInputs={handleInputs} inputs={inputs}/>
    }
    else if(name === 'binary_operator') {
      return <BinaryOperator embeddedBlock1={embeddedBlock1} embeddedBlock2={embeddedBlock2} embeddedOnDrop={embeddedOnDrop} handleInputs={handleInputs} inputs={inputs}/>
    }
  }

  return (
    <div ref={drag} id={id} className={`code-block ${isDragging && 'code-block--dragged'}`}>
      {
        renderBlockByName(name)
      }
      {additional_content}
      {/* TODO: fin block separation can go here when diff block types are defined */}
    </div>
  );
};

export default Block;
