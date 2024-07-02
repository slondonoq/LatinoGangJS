import "@assets/stylesheets/components/Builtin.css";
import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithEmbeddings } from '@components/types'
import { FC } from 'react'

const Acadena: FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedOnDrop,handleInputs,inputs}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");
  const defaultFunc2 = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");

    return (
      <span className='block block__builtin'>
        <input type="hidden" value="acadena (" />
        {"acadena ("}
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            defaultContent={
              <>
                <input
                  type="text"
                  placeholder='valor'
                  value={inputs ? inputs[0] : undefined}
                  onBlur={handleInputs 
                    ? (event) => handleInputs(0,event.target.value)
                    : (_) => defaultFunc2()}/>
              </>
            }
            itemsTypes={[ItemTypes.VARIABLE]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
        <input type="hidden" value=")" />
        {")"}
      </span>
    )
  }
  
  export default Acadena