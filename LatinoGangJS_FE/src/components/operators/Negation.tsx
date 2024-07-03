import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithEmbeddings } from '@components/types'
import { FC } from 'react'

const Negation: FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedOnDrop }) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");

    return (
      <span className='block block__operator--logic block--embedded'>
        <input type="hidden" value="!(" />
        {"!"}
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='valor'
            itemsTypes={[
              ItemTypes.VARIABLE,
              ItemTypes.EMBEDDED,
              ItemTypes.COMPARISON,
              ItemTypes.BOOLEAN,
              ItemTypes.ALOGICO,
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
        <input type="hidden" value=") " />
      </span>
    )
  }
      
    
    export default Negation;