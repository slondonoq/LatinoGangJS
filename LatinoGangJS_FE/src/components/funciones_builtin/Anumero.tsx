import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithEmbeddings } from '@components/types'
import { FC } from 'react'

const Anumero: FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedOnDrop}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");

    return (
      <span className='block block__builtin block--embedded'>
        <input type="hidden" value="anumero (" />
        {"anumero ("}
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='valor'
            itemsTypes={[
              ItemTypes.VARIABLE, 
              ItemTypes.NUMBER,
              ItemTypes.STRING,
              ItemTypes.BOOLEAN,

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
  
  export default Anumero