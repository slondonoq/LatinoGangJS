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
import ReturnBlock from '@components/functions/ReturnBlock'
import FunctionBlock from '@components/functions/FunctionBlock'
import AnonymousFunBlock from '@components/functions/AnonymousFunBlock'
import FunCall from '@components/functions/FunCall'
import Lists from '@components/structures/Lists'
import Dictionaries from '@components/structures/Dictionaries'
import DicElement from '@components/structures/DicElement'

const CodeBlockSelection = () => {
  // TODO: implement layout section
  return(
    <section id="block-selection">
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
          <li>
            <a href="#funciones" id='funciones-tag'> Funciones </a>
          </li>
          <li>
            <a href="#listas" id='listas-tag'> Listas </a>
          </li>
          <li>
            <a href="#diccionarios" id='diccionarios-tag'> Diccionarios </a>
          </li>
        </ul>
      </aside>
      <div className='blocks-container'>
        <h3 id='variables'>Variables</h3>
      <AssignBlock />
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
      <h3 id='funciones'>Funciones</h3>
      <p>Función</p>
      <FunctionBlock />
      <p>Función anónima</p>
      <AnonymousFunBlock />
      <p>Retorno</p>
      <ReturnBlock />
      <p>Llamado</p>
      <FunCall />
      <h3 id='listas'>Listas</h3>
      <Lists />
      <h3 id='diccionarios'>Diccionarios</h3>
      <p>Diccionario</p>
      <Dictionaries />
      <p>Clave - Valor</p>
      <DicElement />
      </div>

    </section>
  )
}

export default CodeBlockSelection