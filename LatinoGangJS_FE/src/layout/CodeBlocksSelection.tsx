import "@assets/stylesheets/layout/CodeBlocksSelection.css";
import DoWhileBlock from "@components/iterators/DoWhileBlock";
import ForBlock from "@components/iterators/ForBlock";
import ForRangeBlock from "@components/iterators/ForRangeBlock";
import RangeBlock from "@components/iterators/RangeBlock";
import WhileBlock from "@components/iterators/WhileBlock";
import BinaryLogicOperator from "@components/operators/BinaryLogicOperator";
import BinaryOperator from "@components/operators/BinaryOperator";
import AssignBlock from "@components/variables/AssignBlock";
import OperationAssignBlock from "@components/variables/OperationAssignBlock";
import ReturnBlock from "@components/functions/ReturnBlock";
import FunctionBlock from "@components/functions/FunctionBlock";
import AnonymousFunBlock from "@components/functions/AnonymousFunBlock";
import FunCall from "@components/functions/FunCall";
import Lists from "@components/structures/Lists";
import Dictionaries from "@components/structures/Dictionaries";
import DicElement from "@components/structures/DicElement";

// import { useDrop } from 'react-dnd';
import React from "react";
// import {ItemTypes} from "@components/ItemTypes.tsx";
// import {CodeBlock} from "@components/types.tsx";
import Block from "@components/dragNdrop/Block.tsx";
import { ItemTypes } from "@components/ItemTypes.tsx";
import { CodeBlock } from "@components/types.tsx";
import { useDrop } from "react-dnd";

interface CodeBlockSelectionProps {
  onDrop: (block: CodeBlock) => void;
}

const CodeBlockSelection: React.FC<CodeBlockSelectionProps> = ({ onDrop }) => {
  const [, drop] = useDrop({
    accept: [ItemTypes.BLOCK, ItemTypes.EMBEDDED],
    drop: (block: CodeBlock) => {
      onDrop(block);
    },
  });

  // TODO: implement layout section
  return (
    <section id="block-selection" ref={drop}>
      <aside id="block-type-nav">
        <ul>
          <li>
            <a href="#variables" id="variables-tag">
              {" "}
              Variables{" "}
            </a>
          </li>
          <li>
            <a href="#operadores" id="operadores-tag">
              {" "}
              Operadores{" "}
            </a>
          </li>
          <li>
            <a href="#comparadores" id="comparadores-tag">
              {" "}
              Comparadores{" "}
            </a>
          </li>
          <li>
            <a href="#bucles" id="bucles-tag">
              {" "}
              Bucles{" "}
            </a>
          </li>
          <li>
            <a href="#funciones" id="funciones-tag">
              {" "}
              Funciones{" "}
            </a>
          </li>
          <li>
            <a href="#listas" id="listas-tag">
              {" "}
              Listas{" "}
            </a>
          </li>
          <li>
            <a href="#diccionarios" id="diccionarios-tag">
              {" "}
              Diccionarios{" "}
            </a>
          </li>
        </ul>
      </aside>
      <div className="blocks-container">
        <Block name='code_start' typeOfBlock='block'/>
        <h3 id="variables">Variables</h3>
        <Block name='assignation' typeOfBlock='block_with_embeddings' />

        {/* <OperationAssignBlock /> */}
        <h3 id="operadores">Operadores</h3>
        <Block name='binary_operator' typeOfBlock='embedded' />
        <h3 id="comparadores">Comparadores</h3>
        {/* <Block content={<BinaryLogicOperator />} /> */}
        <h3 id="bucles">Bucles</h3>
        <p>Desde</p>
        {/* <Block content={<ForBlock />} /> */}
        <p>Para ... en rango</p>
        <RangeBlock range_n_values={1} />
        <RangeBlock range_n_values={2} />
        <RangeBlock range_n_values={3} />
        <ForRangeBlock />
        <p>Mientras</p>
        <WhileBlock />
        <p>Repetir ... hasta</p>
        <DoWhileBlock />
        <h3 id="funciones">Funciones</h3>
        <p>Función</p>
        <FunctionBlock />
        <p>Función anónima</p>
        <AnonymousFunBlock />
        <p>Retorno</p>
        <ReturnBlock />
        <p>Llamado</p>
        <FunCall />
        <h3 id="listas">Listas</h3>
        <Lists />
        <h3 id="diccionarios">Diccionarios</h3>
        <p>Diccionario</p>
        <Dictionaries />
        <p>Clave - Valor</p>
        <DicElement />
      </div>
    </section>
  );
};

export default CodeBlockSelection;
