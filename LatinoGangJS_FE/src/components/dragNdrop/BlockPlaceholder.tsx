import { useDrop } from 'react-dnd'
import {ItemTypes} from "@components/ItemTypes.tsx"
import { CodeBlock, PlaceholderBlock } from "@components/types.tsx"
import React, { useEffect, useState } from 'react'
import Block from './Block'

const BlockPlaceholder: React.FC<PlaceholderBlock> = ({ isReduced, placeholderText, defaultContent, onDrop, itemsTypes=[ItemTypes.BLOCK, ItemTypes.EMBEDDED], embedding_spot }) => {
  
  const [{ isOver, hoveredBlock },drop] = useDrop({
    
    accept: itemsTypes,
    drop: (block: CodeBlock) => {
      if(isOver) {
        onDrop(block, embedding_spot)
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
    if(defaultContent && !replacementBlock.props?.children) {
      setReplacementBlock(defaultContent)
    }
    
  }, [defaultContent, replacementBlock])

  useEffect(() => {
    if(isOver) {
      setBlockPreview(
        <><span className='block--preview'>{<Block name={hoveredBlock.name} blockTypes={hoveredBlock.blockTypes} />}</span></>
      )
    }
    else{
      setBlockPreview(<></>)
    }
  }, [isOver])

  return (
    <span className={`block__placeholder--container${defaultContent ? ' block__placeholder--container-w-default' : ''}`}>
      <div ref={drop} className={`block__placeholder ${
        isReduced
          ? 'block__placeholder--reduced'
          : (!blockPreview.props?.children && placeholderText)
            ? 'block__placeholder--text'
            : defaultContent && !blockPreview.props?.children ?
              'block__placeholder--content'
              : ''

      }`}>
        { blockPreview.props?.children ?? 
          ( !replacementBlock.props?.children && placeholderText )
        }
      </div>
      <span className={`block__placeholder--block-container`}>
        {
          !blockPreview.props?.children && replacementBlock.props?.children
        }
      </span>
    </span>
  )
}

export default BlockPlaceholder