import "@assets/stylesheets/layout/CodeBlocksSelection.css";
import React, { useEffect } from "react";
import Block from "@components/dragNdrop/Block.tsx";
import { ItemTypes } from "@components/ItemTypes.tsx";
import { CodeBlock } from "@components/types.tsx";
import { useDrop } from "react-dnd";
import Modal from "./Modal";

interface CodeBlockSelectionProps {
  onDrop: (block: CodeBlock) => void;
}

const CodeBlockSelection: React.FC<CodeBlockSelectionProps> = ({ onDrop }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [varibles, setVariables] = React.useState<string[]>([]);
  const [, drop] = useDrop({
    accept: [
      ItemTypes.EMBEDDED,
      ItemTypes.BLOCK,
      ItemTypes.RANGE,
      ItemTypes.DECLARATION,
      ItemTypes.COMPARISON,
      ItemTypes.VARIABLE,
      ItemTypes.KEY_VALUE,
      ItemTypes.IF_NESTING,
      ItemTypes.SWITCH,
      ItemTypes.FUNCTION_CALL,
      ItemTypes.CONCAT,
      ItemTypes.DICT,
      ItemTypes.LIST,
      ItemTypes.EMBEDDED_SENTENCE,
      ItemTypes.NUMBER,
      ItemTypes.STRING,
      ItemTypes.BOOLEAN,
      ItemTypes.NULL,
      ItemTypes.ANUMERO,
      ItemTypes.ACADENA,
      ItemTypes.ALOGICO,
    ],
    drop: (block: CodeBlock) => {
      onDrop(block);
    },
  });
  useEffect(() => {
    console.log(varibles);
  }
  , [varibles]);
  // TODO: implement layout section
  return (
    <section id="block-selection" ref={drop}>
      <aside id="block-type-nav">
        <ul>
          <li>
            <a href="#inicio" id="inicio-tag">
              {" "}
              Inicio{" "}
            </a>
          </li>
          <li>
            <a href="#variables" id="variables-tag">
              {" "}
              Variable{" "}
            </a>
          </li>
          <li>
            <a href="#operadores" id="operadores-tag">
              {" "}
              Operación{" "}
            </a>
          </li>
          <li>
            <a href="#comparadores" id="comparadores-tag">
              {" "}
              Comparación{" "}
            </a>
          </li>
          <li>
            <a href="#tipos de datos" id="tiposDatos-tag">
              {" "}
              Valores{" "}
            </a>
          </li>
          <li>
            <a href="#funciones built-in" id="builtin-tag">
              {" "}
              Pantalla{" "}
            </a>
          </li>
          <li>
            <a href="#condicionales" id="condicionales-tag"> 
              {" "}
              Condición{" "}
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
              Lista{" "}
            </a>
          </li>
          <li>
            <a href="#diccionarios" id="diccionarios-tag">
              {" "}
              Diccionario{" "}
            </a>
          </li>
        </ul>
      </aside>
      <div className="blocks-container">
        <h3 id="inicio">Inicio</h3>
        <Block name='code_start' blockTypes={['block']}/>
        <hr />
        <h3 id="variables">Variables</h3>
        <p>Variables</p>
        <button onClick={()=> setOpenModal(true)}>Crea una variable</button>
        <i>Tip: debes crear una variable para poder insertarla en ranuras "variable", "nombre", "argumento" o "argumento(s)"</i>
        {openModal && (<Modal closeModal={setOpenModal} variablesList = {varibles} updateVariables={setVariables}/>)}
        {varibles.map((variable, index) => (
          <Block 
            key={index} 
            name='variable' 
            variableName={variable} 
            blockTypes={['embedded','variable']}/>
        ))
        }
        <p>Asignaciones</p>
        <Block name='assignation' blockTypes={['block_with_embeddings']}/>
        <Block name='op_assignation' blockTypes={['block_with_embeddings']} isSentence={true}/>
        <p>Incremento y decremento</p>
        <Block name='inc_dec' blockTypes={['block_with_embeddings']} isSentence={true}/>
        <hr />
        <h3 id="operadores">Operaciones</h3>
        <p>Operaciones aritméticas, de concatenación y regex</p>
        <Block name='binary_operator' blockTypes={['embedded']}/>
        <i>Tip: puedes usar operaciones dentro de algunas ranuras "valor"</i>
        <hr />
        <h3 id="comparadores">Comparación</h3>
        <p>Comparaciones y operaciones lógicas binarias</p>
        <Block name='binary_logic-op' blockTypes={['embedded', 'comparison']}/>
        <p>Negación</p>
        <Block name='negation' blockTypes={['embedded', 'boolean']}/>
        <i>Tip: los valores lógicos y de conversión a lógico también pueden ser usados en ranuras "comparación"</i>
        <hr />
        <h3 id='tipos de datos'>Valores</h3>
        <p>Número y conversión a número</p>
        <Block name='numType' blockTypes={['embedded','number']}/>
        <Block name='to_number' blockTypes={['embedded','anumero']}/>
        <p>Cadena de texo y conversión a cadena</p>
        <Block name='stringType' blockTypes={['embedded','string']}/>
        <Block name='to_string' blockTypes={['embedded','acadena']}/>
        <p>Lógico y conversión a lógico</p>
        <Block name='boolType' blockTypes={['embedded','boolean']}/>
        <Block name='to_boolean' blockTypes={['embedded','alogico']}/>
        <p>Nulo</p>
        <Block name='nullType' blockTypes={['embedded','null']}/>
        <i>Tip: aunque estos son los valores primitivos,
          se pueden usar bloques como variables, diccionarios,
          listas, funciones anónimas, operaciones y comparaciones
          en algunas ranuras "valor"
        </i>
        <p>Multiples valores</p>
        <Block name='moreItems' blockTypes={['embedded', 'concat']}/>
        <i>Tip: este bloque sólo puede utilizarse en ranuras "valor(es)"</i>
        <hr />
        <h3 id='funciones built-in'>Pantalla</h3>
        <p>Mostrar en consola</p>
        <Block name='print' blockTypes={['block_with_embeddings']}/>
        <Block name='write' blockTypes={['block_with_embeddings']}/>
        <Block name='put' blockTypes={['block_with_embeddings']}/>
        <i>Tip: Aunque estos bloques tienen distinto nombre, todos muestran texto en la consola</i>
        <p>Limpiar consola</p>
        <Block name='clean' blockTypes={['block']}/>
        <hr />
        <h3 id='condicionales'>Condicionales</h3>
        <p>Condición Si</p>
        <Block name='cond_if' blockTypes={['block_with_embeddings']}/>
        <Block name='cond_if_alt' blockTypes={['block_with_embeddings']}/>
        <i>
          Tip: Las condiciones alternas se pueden seguir apilando dentro
          del bloque "Si" con la ranura para condiciones alternas
        </i>
        <p>Condiciones alternas</p>
        <Block name='cond_elif' blockTypes={['embedded','if_nesting']}/>
        <Block name='cond_else' blockTypes={['embedded','if_nesting']}/>
        <br/>
        <p>Elegir ... caso</p>
        <Block name='switch' blockTypes={['block_with_embeddings']}/>
        <i>Tip: dentro de este bloque sólo se pueden insertar bloques "caso", "defecto" u "otro"</i>
        <p>Caso</p>
        <Block name='switch_case' blockTypes={['switch']}/>
        <p>Casos por defecto</p>
        <Block name='switch_def' blockTypes={['switch']}/>
        <Block name='switch_other' blockTypes={['switch']}/>
        <p>Romper</p>
        <Block name='break' blockTypes={['block']}/>
        <i>Tip: el bloque "romper" debe ir dentro de algún bloque de caso</i>
        <hr />
        <h3 id="bucles">Bucles</h3>
        <p>Sentencia dentro de bucle</p>
        <Block name='op_assignation' blockTypes={['embedded',  'embedded_sentence']}/>
        <Block name='inc_dec' blockTypes={['embedded',  'embedded_sentence']}/>
        <p>Declaración dentro de bucle</p>
        <Block name='declaration' blockTypes={['block_with_embeddings','declaration','embedded']}/>
        <p>Desde</p>
        <Block name='for' blockTypes={['block_with_embeddings']}/>
        <p>Para ... en rango</p>
        <Block name='range_1' blockTypes={['embedded','range']}/>
        <Block name='range_2' blockTypes={['embedded','range']}/>
        <Block name='range_3' blockTypes={['embedded','range']}/>
        <Block name='for_range' blockTypes={['block_with_embeddings']}/>
        <p>Mientras</p>
        <Block name='while' blockTypes={['block_with_embeddings']}/>
        <p>Repetir ... hasta</p>
        <Block name='do_while' blockTypes={['block_with_embeddings']}/>
        <hr />
        <h3 id="funciones">Funciones</h3>
        <p>Argumentos</p>
        <Block name='argumentList' blockTypes={['embedded', 'argument_list']}/>
        <i>
          Tip: en la ranura "argumento" debes encajar un bloque de variable
          y de la misma manera, puedes encajar un bloque de variable en la
          ranura "argumento(s)"
        </i>
        <p>Función</p>
        <Block name='func' blockTypes={['block_with_embeddings']}/>
        <i>Tip: en la ranura "nombre" para este bloque y el de llamado debes encajar un bloque de variable</i>
        <p>Función anónima</p>
        <Block name='func_anonymous' blockTypes={['embedded']}/>
        <p>Retorno</p>
        <Block name='return' blockTypes={['block']}/>
        <p>Llamado a una función</p>
        <Block name='func_call' blockTypes={['embedded', 'function_call']}/>
        <Block name='func_call' blockTypes={['block_with_embeddings']} isSentence={true}/>
        <hr />
        <h3 id="listas">Listas</h3>
        <p>Listas</p>
        <Block name='list' blockTypes={['embedded', 'list']}/>
        <i>
          Tip: puedes poner listas dentro de listas o de diccionarios.
          Además, también puedes usar el bloque de múltiples valores
          para crear una lista de varios elementos
        </i>
        <p>Acceder a un elemento</p>
        <Block name='list_access' blockTypes={['embedded', 'variable']}/>
        <i>Tip: el índice debe ser un número o una conversión a número</i>
        <hr />
        <h3 id="diccionarios">Diccionarios</h3>
        <p>Diccionario</p>
        <Block name='dict' blockTypes={['embedded', 'dict']}/>
        <i>
          Tip: el diccionario es una estructura compuesta de parejas
          clave valor, por lo que sólo puedes encajar estos bloques
          dentro de la ranura entre llaves {'"{ }"'} del diccionario.
        </i>
        <p>Clave - Valor</p>
        <Block name='dict_elem' blockTypes={['block_with_embeddings',  'key_value']}/>
        <i>Tip: dentro de la ranura "clave" solo puedes encajar bloques de variable</i>
        <p>Acceder a las claves de un diccionario</p>
        <Block name='properties' blockTypes={['embedded', 'variable']}/>
        <i>
          Tip: para acceder de esta manera a un diccionario, debes poner el bloque de
          diccionario dentro de un bloque de asignación "variable = valor"
        </i>
      </div>
    </section>
  );
};

export default CodeBlockSelection;
