import '@assets/stylesheets/layout/Playground.css'
import logo_no_bg from '@assets/img/logo_no_background.png'
import PlayIcon from "@assets/icons/play.svg";
import ClearIcon from "@assets/icons/clear.svg";
import {useDrop} from 'react-dnd'
import Block from "@components/dragNdrop/Block.tsx"
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder.tsx'
import {ItemTypes} from "@components/ItemTypes.tsx"
import {CodeBlock, CodeBlockWithEmbeddings, Data, ElementsData, Embedding_rel} from "@components/types.tsx"

interface PlaygroundInterface {
  codeData: Data,
  elements: ElementsData,
  onDrop: Function
}

const Playground: React.FC<PlaygroundInterface> = ({ codeData, elements, onDrop }) => {

  const [{ isOver },drop] = useDrop({

    accept: [ItemTypes.BLOCK, ItemTypes.EMBEDDED],
    drop: (block: CodeBlock | CodeBlockWithEmbeddings) => {
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

    const element = (
      <Block
        id={elemId}
        name={blockData.name}
        typeOfBlock={blockData.typeOfBlock}
        additional_content={ blockData.typeOfBlock !== 'embedded' ?         
          <>
            <BlockPlaceholder
              key={`placeholder-${elemId}`}
              isReduced={Boolean(sentence_child)}
              onDrop={(block: CodeBlock)=> onDrop(block, elemId)}
              itemsTypes={[ItemTypes.BLOCK]}
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
      />
    )
    console.log(element)
    return element
  }

  return(
      <section id="playground">
        <div id="section-header">
          <button className="btn-section clean">
            Clear
            <img src={ClearIcon} alt="" />
          </button>
          <button className="btn-section play">
            Run
            <img src={PlayIcon} alt="" />
          </button>
        </div>
        <img src={logo_no_bg} id='watermark'/>
        <div className="blocks" ref={drop}>
          {
            codeData.rootElems.map(elemId => 
              <div key={`rootContainer-${elemId}`}>
                {
                  (elements[elemId].typeOfBlock !== 'embedded') && (elements[elemId].name !== 'code_start')
                  ? <BlockPlaceholder
                      key={`root-${elemId}`}
                      onDrop={(block: CodeBlock) => onDrop(block, elemId, true)}
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