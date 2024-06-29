import { useDrop } from 'react-dnd'
import {ItemTypes} from "@components/ItemTypes.tsx"
import { CodeBlock, PlaceholderBlock } from "@components/types.tsx"
import React, { useEffect, useState } from 'react'
import Block from './Block'
import SentenceBlock from './SentenceBlock'

const BlockPlaceholder: React.FC<PlaceholderBlock> = ({ isReduced, placeholderText, defaultContent, onDrop, itemsTypes=[ItemTypes.BLOCK, ItemTypes.SENTENCE] }) => {
  
  const [{ isOver, hoveredBlock },drop] = useDrop({
    
    accept: itemsTypes,
    drop: (block: CodeBlock) => {
      console.log('Dropped')
      if(isOver) {
        onDrop ? onDrop(block) : () => console.log('No drop func');
        !(itemsTypes.includes(ItemTypes.BLOCK)) ?
        (setReplacementBlock(
          <>
            <SentenceBlock
              content={
                <>
                  {block.content}
                  {replacementBlock.props?.children}
                </>
              }
              delFunction={delFunction}
              replaceFunction={replaceFunction}
            />  
          </>
         ) )
        : null
        /* (setReplacementBlock(
          <>
            <Block
              content={
                <>
                  {block.content}
                  {replacementBlock.props?.children}
                </>
              }
              delFunction={delFunction}
              replaceFunction={replaceFunction}
            />  
          </>
        );) */
      }
      
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      hoveredBlock: monitor.getItem()
    })
  });

  const [ replacementBlock, setReplacementBlock ] = useState<JSX.Element>(<></>)
  const [ blockPreview, setBlockPreview ] = useState<JSX.Element>(<></>)

  useEffect(() => {
    //console.log(defaultContent)
    if(defaultContent && !replacementBlock.props?.children) {

      setReplacementBlock(
        <>
          <Block
            content={
              <>
                {defaultContent?.props?.children?.props.content?.props?.children[0]}
                {defaultContent?.props?.children?.props.content?.props?.children[1]}
              </>
            }
            delFunction={delFunction}
            replaceFunction={replaceFunction}
          />
        </>
      )
    }
    
  }, [defaultContent, replacementBlock])

  useEffect(() => {
    if(isOver) {
      setBlockPreview(
        <><span className='block--preview'>{hoveredBlock.content}</span></>
      )
    }
    else if(blockPreview.props?.children){
      setBlockPreview(<></>)
    }
  }, [isOver])

  // const onDrop = (block:CodeBlock) => {
  //   if(!replacementBlock.props?.children) {
  //     setReplacementBlock(
  //       <>
  //         <Block
  //           content={<>{block.content}<BlockPlaceholder /></>}
  //           delFunction={delFunction}
  //           replaceFunction={replaceFunction}
  //         />
  //       </>
  //     )
  //   }
  //   else {
  //     replaceFunction(block)
  //   }
  // }

  const delFunction = () => {
    setReplacementBlock(<></>)
    setBlockPreview(<></>)
  }

  const replaceFunction = (newTopBlock:CodeBlock) => {
    const newTopContent = newTopBlock.content
    // console.log(newTopContent)
    // if(newTopBlock.delFunction) newTopBlock.delFunction()
    // setReplacementBlock(replacementBlock =>
    //   <>
    //     <Block
    //       content={
    //         <>
    //           {newTopContent}
    //           <BlockPlaceholder defaultContent={replacementBlock}/>
    //         </>
    //       }
    //       delFunction={delFunction}
    //       replaceFunction={replaceFunction}
    //     />
    //   </>
    // )
    setReplacementBlock(
      <Block
        content={
          <>
            {newTopContent}
            <BlockPlaceholder defaultContent={replacementBlock}/>
          </>
        }
        delFunction={delFunction}
        replaceFunction={replaceFunction}
      />
    );
  }

  return (
    <span>
      <div ref={drop} className={`block__placeholder ${
        (replacementBlock.props?.children?.type?.name === 'SentenceBlock' ) ? 'block__placeholder--sentence' :
        replacementBlock.props?.children ||isReduced
          ? 'block__placeholder--reduced'
          : (!blockPreview.props?.children && placeholderText)
            ? 'block__placeholder--text'
            : ''

      }`}>
        { blockPreview.props?.children ?? 
          ( !replacementBlock.props?.children && placeholderText )
        }
      </div>
      <span className={`block__placeholder--block-container`}>
        {
          replacementBlock.props?.children
        }
      </span>
    </span>
  )
}

export default BlockPlaceholder