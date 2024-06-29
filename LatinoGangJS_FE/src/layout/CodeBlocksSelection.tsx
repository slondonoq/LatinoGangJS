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
import IncrementDecrement from '@components/operators/IncrementDecrement' ////////////////////////////////////////////////
import Negation from '@components/operators/Negation'
import CondIf from '@components/conditionals/CondIf'
import CondElseIf from '@components/conditionals/CondElseIf'
import CondElse from '@components/conditionals/CondElse'
import CondSwitch from '@components/conditionals/CondSwitch'
import CondCase from '@components/conditionals/CondCase'
import CondDefecto from '@components/conditionals/CondDefecto'
import CondOtro from '@components/conditionals/CondOtro'
import Acadena from '@components/funciones_builtin/Acadena'
import Alogico from '@components/funciones_builtin/Alogico'
import Anumero from '@components/funciones_builtin/Anumero'
import Imprimir from '@components/funciones_builtin/Imprimir'
import Escribir from '@components/funciones_builtin/Escribir'
import Poner from '@components/funciones_builtin/Poner'
import Leer from '@components/funciones_builtin/Leer'
import Tipo from '@components/funciones_builtin/Tipo'
import Limpiar from '@components/funciones_builtin/Limpiar'
import Imprimirf from '@components/funciones_builtin/Imprimirf'
import Romper from '@components/conditionals/Romper'
import AccederElemento from "@components/structures/AccederElemento";

// import { useDrop } from 'react-dnd';
import React from "react";
// import {ItemTypes} from "@components/ItemTypes.tsx";
// import {CodeBlock} from "@components/types.tsx";
import Block from "@components/dragNdrop/Block.tsx";
import { ItemTypes } from "@components/ItemTypes.tsx";
import { CodeBlock } from "@components/types.tsx";
import { useDrop } from "react-dnd";
import SentenceBlock from "@components/dragNdrop/SentenceBlock";
import FormBlock from "@components/FormBlock";

interface CodeBlockSelectionProps {
  onDrop: (block: CodeBlock) => void;
}

const CodeBlockSelection: React.FC<CodeBlockSelectionProps> = ({ onDrop }) => {
  const [, drop] = useDrop({
    accept: [ItemTypes.BLOCK, ItemTypes.SENTENCE],
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
            <a href="#funciones built-in" id="builtin-tag">
              {" "}
              Funciones Built-in{" "}
            </a>
          </li>
          <li>
            <a href="#condicionales" id="condicionales-tag"> 
              {" "}
              Condicionales{" "}
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
        <Block content={<FormBlock />}/>
        <h3 id="variables">Variables</h3>
        <Block content={<AssignBlock onDrop={onDrop} />} />
        <OperationAssignBlock />
        <h3 id="operadores">Operadores</h3>
        <p>Operadores aritmeticos, concatenacion y regex</p>
        <SentenceBlock content={<BinaryOperator />} />
        <p>Incremento y decremento</p>
        <Block content={<IncrementDecrement />}/>
        <p>Negacion</p>
        <Block content={<Negation />}/>
        <h3 id="comparadores">Comparadores</h3>
        <Block content={<BinaryLogicOperator />} />
        <h3 id='funciones built-in'>Funciones Built-in</h3>
        <p>Anumero</p>
        <Block content={<Anumero />}/>
        <p>Acadena</p>
        <Block content={<Acadena />}/>
        <p>Alogico</p>
        <Block content={<Alogico />}/>        
        <p>Imprimirf</p>
        <Block content={<Imprimirf />}/>
        <p>Imprimir</p>
        <Block content={<Imprimir />}/>
        <p>Escribir</p>
        <Block content={<Escribir />}/>
        <p>Poner</p>
        <Block content={<Poner />}/>     
        <p>Tipo</p>   
        <Block content={<Tipo />}/>
        <p>Leer</p>
        <Block content={<Leer />}/>     
        <p>Limpiar</p>   
        <Block content={<Limpiar />}/>
        <h3 id='condicionales'>Condicionales</h3>
        <p>Si</p>
        <Block content={<CondIf />} />
        <p>Osi</p>
        <Block content={<CondElseIf />} />
        <p>Sino</p>
        <Block content={<CondElse />} />
        <p>Elegir</p>
        <Block content={<CondSwitch />} />
        <p>Caso</p>
        <Block content={<CondCase />} />
        <p>Defecto</p>
        <Block content={<CondDefecto />} />
        <p>Otro</p>
        <Block content={<CondOtro />} />
        <p>Romper</p>
        <Block content={<Romper />} />
        <h3 id="bucles">Bucles</h3>
        <p>Desde</p>
        <Block content={<ForBlock />} />
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
        <p>Listas</p>
        <Lists />
        <p>Acceder a un elemento</p>
        <AccederElemento />
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
