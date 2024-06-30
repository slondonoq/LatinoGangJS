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
        <Block name='code_start' blockTypes={['block']}/>
        <h3 id="variables">Variables</h3>
        <Block name='assignation' blockTypes={['block_with_embeddings']}/>
        <Block name='op_assignation' blockTypes={['block_with_embeddings']}/>
        <h3 id="operadores">Operadores</h3>
        <p>Operadores aritmeticos, concatenacion y regex</p>
        <Block name='binary_operator' blockTypes={['embedded']}/>
        <p>Incremento y decremento</p>
        <Block name='inc_dec' blockTypes={['block_with_embeddings']}/>
        <p>Negacion</p>
        <Block name='negation' blockTypes={['block_with_embeddings']}/>
        <h3 id="comparadores">Comparadores</h3>
        <Block name='binary_logic-op' blockTypes={['embedded']}/>
        <h3 id='funciones built-in'>Funciones Built-in</h3>
        <p>Anumero</p>
        <Block name='to_number' blockTypes={['embedded']}/>
        <p>Acadena</p>
        <Block name='to_string' blockTypes={['embedded']}/>
        <p>Alogico</p>
        <Block name='to_boolean' blockTypes={['embedded']}/>
        <p>Imprimirf</p>
        <Block name='print_f' blockTypes={['block_with_embeddings']}/>
        <p>Imprimir</p>
        <Block name='print' blockTypes={['block_with_embeddings']}/>
        <p>Escribir</p>
        <Block name='write' blockTypes={['block_with_embeddings']}/>
        <p>Poner</p>
        <Block name='put' blockTypes={['block_with_embeddings']}/>
        <p>Tipo</p>   
        <Block name='type' blockTypes={['embedded']}/>
        <p>Limpiar</p>
        <Block name='clean' blockTypes={['block']}/>
        <h3 id='condicionales'>Condicionales</h3>
        <p>Si</p>
        <Block name='cond_if' blockTypes={['block_with_embeddings']}/>
        <p>Osi</p>
        <Block name='cond_elif' blockTypes={['block_with_embeddings']}/>
        <p>Sino</p>
        <Block name='cond_else' blockTypes={['block']}/>
        <p>Elegir</p>
        <Block name='switch' blockTypes={['block_with_embeddings']}/>
        <p>Caso</p>
        <Block name='switch_case' blockTypes={['block_with_embeddings']}/>
        <p>Defecto</p>
        <Block name='switch_def' blockTypes={['block']}/>
        <p>Otro</p>
        <Block name='switch_other' blockTypes={['block']}/>
        <p>Romper</p>
        <Block name='break' blockTypes={['block']}/>
        <h3 id="bucles">Bucles</h3>
        <p>Desde</p>
        <Block name='for' blockTypes={['block_with_embeddings']}/>
        <p>Para ... en rango</p>
        <Block name='range_1' blockTypes={['embedded']}/>
        <Block name='range_2' blockTypes={['embedded']}/>
        <Block name='range_3' blockTypes={['embedded']}/>
        <Block name='for_range' blockTypes={['block_with_embeddings']}/>
        <p>Mientras</p>
        <Block name='while' blockTypes={['block_with_embeddings']}/>
        <p>Repetir ... hasta</p>
        <Block name='do_while' blockTypes={['block_with_embeddings']}/>
        <h3 id="funciones">Funciones</h3>
        <p>Función</p>
        <Block name='func' blockTypes={['block_with_embeddings']}/>
        <p>Función anónima</p>
        <Block name='func_anonymous' blockTypes={['embedded']}/>
        <p>Retorno</p>
        <Block name='return' blockTypes={['block']}/>
        <p>Llamado</p>
        <Block name='func_call' blockTypes={['block_with_embeddings']}/>
        <h3 id="listas">Listas</h3>
        <p>Listas</p>
        <Block name='list' blockTypes={['block_with_embeddings']}/>
        <p>Acceder a un elemento</p>
        <Block name='list_access' blockTypes={['embedded']}/>
        <h3 id="diccionarios">Diccionarios</h3>
        <p>Diccionario</p>
        <Block name='dict' blockTypes={['block_with_embeddings']}/>
        <p>Clave - Valor</p>
        <Block name='dict_elem' blockTypes={['block_with_embeddings']}/>
      </div>
    </section>
  );
};

export default CodeBlockSelection;
