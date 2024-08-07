import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithNestingAndEmbeddings } from '@components/types'
import { FC } from 'react'

const AccederElemento: FC<CodeBlockWithNestingAndEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedOnDrop}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");
    return (
      <span className="block block__list block--embedded">
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='variable'
            itemsTypes={[ItemTypes.VARIABLE]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
        <input type="hidden" value="("/>
        {"["}
        {embeddedBlock2 ?? (
          <BlockPlaceholder
            placeholderText='indice'
            itemsTypes={[ItemTypes.NUMBER]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_2'
          />
        )}
        <input type="hidden" value=")"/>
        {"]"}
      </span>
    );
  };
  
  export default AccederElemento;
  