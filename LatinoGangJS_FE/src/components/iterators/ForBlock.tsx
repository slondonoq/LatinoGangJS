import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithNestingAndEmbeddings } from '@components/types'
import { FC } from 'react'

const ForBlock: FC<CodeBlockWithNestingAndEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedBlock3, embeddedOnDrop, nestedBlock, nestedOnDrop}) => {
  const defaultFunc: Function = () => console.log('Oops, forgot to pass onDrop prop to block with embeddings')
  const defaultFunc2: Function = () => console.log('Oops, forgot to pass onDrop prop to block with nesting')
  // TODO: add proper types
  return (
    <div className='block__iterator--container'>
      <span className='block block__iterator block__sentence'>
        <input type="hidden" value="desde (" />
        {"desde ("}
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='declaración'
            itemsTypes={[ItemTypes.EMBEDDED]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
        <input type="hidden" value=";" />
        ;
        {embeddedBlock2 ?? (
          <BlockPlaceholder
            placeholderText='expresión'
            itemsTypes={[ItemTypes.EMBEDDED]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_2'
          />
        )}
        <input type="hidden" value=";" />
        ;
        {embeddedBlock3 ?? (
          <BlockPlaceholder
            placeholderText='sentencia'
            itemsTypes={[ItemTypes.EMBEDDED]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_3'
          />
        )}
        <input type="hidden" value=")" />
        {")"}
      </span>
      <span className='block__iterator--nested-block'>
        {nestedBlock ?? (
          <BlockPlaceholder
            placeholderText=''
            itemsTypes={[ItemTypes.BLOCK]}
            onDrop={nestedOnDrop ? nestedOnDrop : defaultFunc2}
            embedding_spot='emb_child_3'
          />
        )}
      </span>
      <div className='block block__iterator block__iterator--end block__sentence'>
        <input type="hidden" value="fin" />
      </div>
    </div>
  )
}

export default ForBlock