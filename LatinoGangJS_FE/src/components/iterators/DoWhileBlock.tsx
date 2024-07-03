import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithNestingAndEmbeddings } from '@components/types'
import { FC } from 'react'

const DoWhileBlock: FC<CodeBlockWithNestingAndEmbeddings> = ({ embeddedBlock1, embeddedOnDrop, nestedBlock, nestedOnDrop}) => {
  const defaultFunc = () => console.log('Oops, forgot to pass onDrop prop to block with embeddings')
  const defaultFunc2 = () => console.log('Oops, forgot to pass onDrop prop to block with nesting')
  return (
    <div className='block__iterator--container'>
      <span className='block block__iterator block__sentence'>
        <input type="hidden" value="repetir " />
        repetir
      </span>
      <span className='block__iterator--nested-block'>
      {nestedBlock ?? (
          <BlockPlaceholder
            placeholderText=''
            itemsTypes={[ItemTypes.BLOCK]}
            onDrop={nestedOnDrop ? nestedOnDrop : defaultFunc2}
            embedding_spot='emb_child_1'
          />
        )}
      </span>
      <div className='block block__iterator block__iterator--end block__sentence'>
        {"hasta ("}
        <input type="hidden" value="hasta(" />
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='comparación'
            itemsTypes={[
              ItemTypes.COMPARISON,
              ItemTypes.BOOLEAN,
              ItemTypes.ALOGICO
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_3'
          />
        )}
        {")"}
        <input type="hidden" value=") " />
      </div>
    </div>
  )
}

export default DoWhileBlock