import '@assets/stylesheets/layout/Playground.css'
import logo_no_bg from '@assets/img/logo_no_background.png'
import PlayIcon from "@assets/icons/play.svg";
import ClearIcon from "@assets/icons/clear.svg";
import {useDrop} from 'react-dnd'
import Block from "@components/dragNdrop/Block.tsx"
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder.tsx'
import {ItemTypes} from "@components/ItemTypes.tsx"
import {CodeBlock, Data, ElementsData, Embedding_rel, Nested_rel} from "@components/types.tsx"
import { MouseEventHandler } from 'react';


interface PlaygroundInterface {
  codeData: Data,
  elements: ElementsData,
  onDrop: Function,
  clearPlayground: MouseEventHandler<HTMLButtonElement>,
  handleInputs: Function,
  onFormSubmit: (ev: SubmitEvent) => void
}

const Playground: React.FC<PlaygroundInterface> = ({ codeData, elements, onDrop, clearPlayground ,handleInputs, onFormSubmit }) => {

  const [{ isOver },drop] = useDrop({

    accept: [
      ItemTypes.BLOCK,
      ItemTypes.EMBEDDED,
      ItemTypes.COMPARISON,
      ItemTypes.DECLARATION,
      ItemTypes.RANGE,
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
      ItemTypes.ALOGICO
    ],
    drop: (block: CodeBlock) => {
      if(isOver) {
        onDrop(block);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    })
    
  });

  const renderElem = (elemId: string) => {
    const blockData: CodeBlock = elements[elemId] 

    // Return undefined if no block data was found
    if (!blockData) return undefined

    const sentence_child: string = codeData.sentence_relations[elemId]?.sent_child ?? ''
    const embedded_rel: Embedding_rel = codeData.embedded_relations[elemId]
    const nested_rel: Nested_rel = codeData.nested_relations[elemId]
    const inputs: string[] = codeData.inputs[elemId]
    const element = (
      <Block
        id={elemId}
        name={blockData.name}
        blockTypes={blockData.blockTypes}
        additional_content={ 
          (!blockData.blockTypes.includes('embedded')
            && blockData.name !== 'cond_else'
            && blockData.name !== 'return'
          ) 
          || blockData.name == 'cond_elif' ?         
          <>
            {
              (blockData.name === 'dict_elem' && sentence_child)
                ? <input type="hidden" value=", " />
                : null
            }
            <BlockPlaceholder
              key={`placeholder-${elemId}`}
              isReduced={ Boolean(sentence_child) || blockData.name === 'cond_elif'}
              onDrop={(block: CodeBlock)=> onDrop(block, elemId)}
              itemsTypes={
                blockData.blockTypes.includes('key_value')
                ?[ItemTypes.KEY_VALUE]
                :blockData.blockTypes.includes('switch')
                ?[ItemTypes.SWITCH]
                :blockData.blockTypes.includes('if_nesting')
                ?[ItemTypes.IF_NESTING]
                :[ItemTypes.BLOCK]}
            />
            {
              renderElem(sentence_child)
            }
          </>
          : undefined
        }
        embeddedBlock1={renderElem(embedded_rel?.emb_child_1 ?? '')}
        embeddedBlock2={renderElem(embedded_rel?.emb_child_2 ?? '')}
        embeddedBlock3={renderElem(embedded_rel?.emb_child_3 ?? '')}
        embeddedOnDrop={(block: CodeBlock, embedding_spot: string) => onDrop(block, elemId, undefined, embedding_spot)}
        handleInputs={(pos:number,inputValue:string) => handleInputs(elements[elemId], pos,inputValue)}
        inputs={inputs}
        nestedBlock={renderElem(nested_rel?.nested_child ?? '')}
        nestedOnDrop={(block: CodeBlock) => onDrop(block, elemId, undefined, undefined, true)}
        variableName={blockData.variableName ?? ''}
        isSentence={blockData.isSentence}
      />
    )
    //console.log(element)
    return element
  }

  const getElementAsForm = (id: string): HTMLFormElement | null => {

    const element = document.getElementById(id)
    if (element instanceof HTMLFormElement) {
      return element
    }
    return null
  }
  
  return(
      <section id="playground">
        <div id="section-header">
          <button className="btn-section clean" onClick={clearPlayground} >
            Limpiar Bloques
            <img src={ClearIcon} alt="" />
          </button>
          <button className="btn-section play" onClick={()=> {
            const form: HTMLFormElement | null = getElementAsForm('blocks_for_translation')
            if(form) {
              form.onsubmit = onFormSubmit
              form.requestSubmit()
            }
          }}>
            Traducir bloques
            <img src={PlayIcon} alt="" />
          </button>
        </div>
        <img src={logo_no_bg} id='watermark'/>
        <div className="blocks" ref={drop}>
          {
            codeData.rootElems.map(elemId => 
              <div key={`rootContainer-${elemId}`}>
                {
                  
                  (!elements[elemId].blockTypes.includes('embedded')) && (elements[elemId].name !== 'code_start')
                  ? <BlockPlaceholder
                      key={`root-${elemId}`}
                      onDrop={(block: CodeBlock) => onDrop(block, elemId, true, undefined, codeData.nested_relations[elemId]?.nested_parent ? true : false)}
                      itemsTypes={[ItemTypes.BLOCK]}
                    />
                  : undefined
                }
                {renderElem(elemId)}
              </div>
            )
          }
        </div>
      </section>
  )
}

  export default Playground