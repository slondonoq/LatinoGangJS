import '@assets/stylesheets/layout/Playground.css'
import logo_no_bg from '@assets/img/logo_no_background.png'
import PlayIcon from "@assets/icons/play.svg";
import ClearIcon from "@assets/icons/clear.svg";
import {useDrop} from 'react-dnd'
import Block from "@components/dragNdrop/Block.tsx"
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder.tsx'
import {ItemTypes} from "@components/ItemTypes.tsx"
import {CodeBlock, Data, ElementsData} from "@components/types.tsx"
import SentenceBlock from '@components/dragNdrop/SentenceBlock'

interface PlaygroundInterface {
  codeData: Data,
  elements: ElementsData,
  onDrop: Function,
  runFunc: Function,
}

const Playground: React.FC<PlaygroundInterface> = ({ codeData, elements, onDrop ,runFunc}) => {

  const [{ isOver },drop] = useDrop({

    accept: [ItemTypes.BLOCK, ItemTypes.SENTENCE],
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
      return (
        <>
          <Block id={elemId} key={elemId} content={
            <>
              {elements[elemId].props?.children}
              <BlockPlaceholder
                key={`placeholder-${elemId}`}
                isReduced={Boolean(codeData.sentence_relations[elemId].sent_child)}
                onDrop={(block: CodeBlock)=> onDrop(block, elemId)}
              />
              {
                codeData.sentence_relations[elemId].sent_child 
                  ? renderElem(codeData.sentence_relations[elemId].sent_child ?? '') 
                  : null}
            </>
          }/>
        </>
      );
    }

  return(
      <section id="playground">
        <div id="section-header">
          <button className="btn-section clean">
            Clear
            <img src={ClearIcon} alt="" />
          </button>
          <button className="btn-section play" onClick={runFunc}>
            Run
            <img src={PlayIcon} alt="" />
          </button>
        </div>
        <img src={logo_no_bg} id='watermark'/>
        <div className="blocks" ref={drop}>
          {
            codeData.rootElems.map(elemId => 
              <div key={`rootContainer-${elemId}`}>
                <BlockPlaceholder
                  key={`root-${elemId}`}
                  onDrop={(block: CodeBlock) => onDrop(block, elemId, true)} 
                />
                {renderElem(elemId)}
              </div>
            )
          }
        </div>
      </section>
  )
}

  export default Playground