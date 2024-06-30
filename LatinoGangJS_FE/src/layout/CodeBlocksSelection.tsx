import "@assets/stylesheets/layout/CodeBlocksSelection.css";
import React from "react";
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
            <a href="#tipos de datos" id="tiposDatos-tag">
              {" "}
              Tipos de datos{" "}
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
          <li>
            <a href="#auxiliares" id="auxiliares-tag">
              {" "}
              Bloques auxiliares{" "}
            </a>
          </li>
        </ul>
      </aside>
      <div className="blocks-container">
        <Block name='code_start' typeOfBlock='block'/>
        <h3 id="variables">Variables</h3>
        <Block name='assignation' typeOfBlock='block_with_embeddings' />
        <Block name='op_assignation' typeOfBlock='block_with_embeddings' />
        <h3 id="operadores">Operadores</h3>
        <p>Operadores aritmeticos, concatenacion y regex</p>
        <Block name='binary_operator' typeOfBlock='embedded' />
        <p>Incremento y decremento</p>
        <Block name='inc_dec' typeOfBlock='block_with_embeddings'/>
        <p>Negacion</p>
        <Block name='negation' typeOfBlock='block_with_embeddings'/>
        <h3 id="comparadores">Comparadores</h3>
        <Block name='binary_logic-op' typeOfBlock='embedded'/>
        <h3 id='tipos de datos'>Tipos de datos</h3>
        <p>Número</p>
        <Block name='numType' typeOfBlock='embedded'/>
        <p>Cadena de texo</p>
        <Block name='stringType' typeOfBlock='embedded'/>
        <p>Lista</p>
        <Block name='listType' typeOfBlock='embedded'/>
        <p>Diccionario</p>
        <Block name='dictType' typeOfBlock='block_with_embeddings'/>
        <p>Nulo</p>
        <Block name='nullType' typeOfBlock='embedded'/>
        <p>Lógico</p>
        <Block name='boolType' typeOfBlock='embedded'/>
        <p>Variable</p>
        <Block name='varType' typeOfBlock='embedded'/>
        <h3 id='funciones built-in'>Funciones Built-in</h3>
        <p>Anumero</p>
        <Block name='to_number' typeOfBlock='embedded'/>
        <p>Acadena</p>
        <Block name='to_string' typeOfBlock='embedded'/>
        <p>Alogico</p>
        <Block name='to_boolean' typeOfBlock='embedded'/>
        <p>Imprimirf</p>
        <Block name='print_f' typeOfBlock='block_with_embeddings'/>
        <p>Imprimir</p>
        <Block name='print' typeOfBlock='block_with_embeddings'/>
        <p>Escribir</p>
        <Block name='write' typeOfBlock='block_with_embeddings'/>
        <p>Poner</p>
        <Block name='put' typeOfBlock='block_with_embeddings'/>
        <p>Tipo</p>   
        <Block name='type' typeOfBlock='embedded'/>
        <p>Limpiar</p>
        <Block name='clean' typeOfBlock='block'/>
        <h3 id='condicionales'>Condicionales</h3>
        <p>Si</p>
        <Block name='cond_if' typeOfBlock='block_with_embeddings'/>
        <p>Osi</p>
        <Block name='cond_elif' typeOfBlock='block_with_embeddings'/>
        <p>Sino</p>
        <Block name='cond_else' typeOfBlock='block'/>
        <p>Elegir</p>
        <Block name='switch' typeOfBlock='block_with_embeddings'/>
        <p>Caso</p>
        <Block name='switch_case' typeOfBlock='block_with_embeddings'/>
        <p>Defecto</p>
        <Block name='switch_def' typeOfBlock='block'/>
        <p>Otro</p>
        <Block name='switch_other' typeOfBlock='block'/>
        <p>Romper</p>
        <Block name='break' typeOfBlock='block'/>
        <h3 id="bucles">Bucles</h3>
        <p>Desde</p>
        <Block name='for' typeOfBlock='block_with_embeddings'/>
        <p>Para ... en rango</p>
        <Block name='range_1' typeOfBlock='embedded'/>
        <Block name='range_2' typeOfBlock='embedded'/>
        <Block name='range_3' typeOfBlock='embedded'/>
        <Block name='for_range' typeOfBlock='block_with_embeddings'/>
        <p>Mientras</p>
        <Block name='while' typeOfBlock='block_with_embeddings'/>
        <p>Repetir ... hasta</p>
        <Block name='do_while' typeOfBlock='block_with_embeddings'/>
        <h3 id="funciones">Funciones</h3>
        <p>Función</p>
        <Block name='func' typeOfBlock='block_with_embeddings'/>
        <p>Función anónima</p>
        <Block name='func_anonymous' typeOfBlock='embedded'/>
        <p>Retorno</p>
        <Block name='return' typeOfBlock='block'/>
        <p>Llamado</p>
        <Block name='func_call' typeOfBlock='block_with_embeddings'/>
        <h3 id="listas">Listas</h3>
        <p>Listas</p>
        <Block name='list' typeOfBlock='block_with_embeddings'/>
        <p>Acceder a un elemento</p>
        <Block name='list_access' typeOfBlock='embedded'/>
        <h3 id="diccionarios">Diccionarios</h3>
        <p>Diccionario</p>
        <Block name='dict' typeOfBlock='block_with_embeddings'/>
        <p>Clave - Valor</p>
        <Block name='dict_elem' typeOfBlock='block_with_embeddings'/>
        <h3 id='auxiliares'>Bloques auxiliares</h3>
        <p>Varios elementos</p>
        <Block name='moreItems' typeOfBlock='embedded'/>
        <p>Acceder a las propiedades de un elemento</p>
        <Block name='properties' typeOfBlock='embedded'/>
      </div>
    </section>
  );
};

export default CodeBlockSelection;
