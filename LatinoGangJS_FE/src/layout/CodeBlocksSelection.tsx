import '@assets/stylesheets/layout/CodeBlocksSelection.css'
import DoWhileBlock from '@components/iterators/DoWhileBlock'
import ForBlock from '@components/iterators/ForBlock'
import ForRangeBlock from '@components/iterators/ForRangeBlock'
import RangeBlock from '@components/iterators/RangeBlock'
import WhileBlock from '@components/iterators/WhileBlock'
import BinaryLogicOperator from '@components/operators/BinaryLogicOperator'
import BinaryOperator from '@components/operators/BinaryOperator'
import AssignBlock from '@components/variables/AssignBlock'
import OperationAssignBlock from '@components/variables/OperationAssignBlock'

// import { useDrop } from 'react-dnd';
import React from "react";
// import {ItemTypes} from "@components/ItemTypes.tsx";
// import {CodeBlock} from "@components/types.tsx";
import Block from "../Block.tsx";
import {ItemTypes} from "@components/ItemTypes.tsx";
import {CodeBlock} from "@components/types.tsx";
import {useDrop} from "react-dnd";

interface CodeBlockSelectionProps {
  onDrop: (id?:string) => void;
}

const CodeBlockSelection:React.FC<CodeBlockSelectionProps> = ({onDrop}) => {
  const [,drop] = useDrop({
    accept: ItemTypes.BLOCK,
    drop: (block: CodeBlock) => {
      onDrop(block.id);
    },
  });
    // TODO: implement layout section
  return(
    <section id="block-selection" ref={drop}>
      <aside id="block-type-nav">
        <ul>
          <li>
            <a href="#variables" id="variables-tag"> Variables </a>
          </li>
          <li>
            <a href="#operadores" id="operadores-tag"> Operadores </a>
          </li>
          <li>
            <a href="#comparadores" id="comparadores-tag"> Comparadores </a>
          </li>
          <li>
            <a href="#bucles" id="bucles-tag"> Bucles </a>
          </li>
        </ul>
      </aside>
      <div className='blocks-container'>
        <h3 id='variables'>Variables</h3>
      <Block content={<AssignBlock />}/>

      <OperationAssignBlock />
      <h3 id='operadores'>Operadores</h3>
      <BinaryOperator />
      <h3 id='comparadores'>Comparadores</h3>
      <BinaryLogicOperator />
      <h3 id='bucles'>Bucles</h3>
      <p>Desde</p>
      <ForBlock />
      <p>Para ... en rango</p>
      <RangeBlock range_n_values={1}/>
      <RangeBlock range_n_values={2}/>
      <RangeBlock range_n_values={3}/>
      <ForRangeBlock />
      <p>Mientras</p>
      <WhileBlock />
      <p>Repetir ... hasta</p>
      <DoWhileBlock />
      </div>
    </section>
  )
}

export default CodeBlockSelection