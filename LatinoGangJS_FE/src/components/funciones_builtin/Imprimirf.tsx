import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithEmbeddings } from '@components/types'
import { FC } from 'react'

const Imprimirf: FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedOnDrop}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");

    return (
      <span className='block block__builtin block__sentence'>
        <input type="hidden" value="imprimirf (" />
        {"imprimirf ("}
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='valor'
            itemsTypes={[
              ItemTypes.VARIABLE, 
              ItemTypes.NUMBER,
              ItemTypes.STRING,
              ItemTypes.BOOLEAN,
              ItemTypes.ACADENA,
              ItemTypes.ANUMERO,
              ItemTypes.ALOGICO,
              ItemTypes.NULL
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
        <input type="hidden" value=")" />
        {")"}
      </span>
    )
  }
  
  export default Imprimirf