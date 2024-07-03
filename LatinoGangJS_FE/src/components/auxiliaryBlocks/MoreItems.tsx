import "@assets/stylesheets/components/AuxiliaryBlocks.css";
import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithEmbeddings } from '@components/types'
import { FC } from 'react'

const MoreItems: FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedOnDrop}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");
    return (
      <span className="block block__auxiliary block--embedded">
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='elemento'
            itemsTypes={[
              ItemTypes.VARIABLE, 
              ItemTypes.NUMBER,
              ItemTypes.STRING,
              ItemTypes.BOOLEAN,
              ItemTypes.ACADENA,
              ItemTypes.ANUMERO,
              ItemTypes.ALOGICO,
              ItemTypes.NULL,
              ItemTypes.CONCAT, 
              ItemTypes.DICT, 
              ItemTypes.LIST
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
        <input type="hidden" value=","/>
        {","}
        {embeddedBlock2 ?? (
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
              ItemTypes.NULL, 
              ItemTypes.CONCAT, 
              ItemTypes.DICT, 
              ItemTypes.LIST
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_2'
          />
        )}
      </span>
    );
  };

export default MoreItems;
