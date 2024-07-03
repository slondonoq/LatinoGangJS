import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithEmbeddings } from '@components/types'
import { FC } from 'react'

const ListArguments: FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedOnDrop}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");
    return (
      <span className="block block__function block--embedded">
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='argument'
            itemsTypes={[
              ItemTypes.VARIABLE, 
              ItemTypes.ARGUMENT_LIST, 
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
        <input type="hidden" value=","/>
        {","}
        {embeddedBlock2 ?? (
          <BlockPlaceholder
            placeholderText='argument'
            itemsTypes={[
              ItemTypes.VARIABLE, 
              ItemTypes.ARGUMENT_LIST, 
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_2'
          />
        )}
      </span>
    );
  };

export default ListArguments;
