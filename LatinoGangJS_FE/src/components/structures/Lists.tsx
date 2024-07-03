import "@assets/stylesheets/components/Structures.css";
import { ItemTypes } from "@components/ItemTypes"
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder"
import { CodeBlockWithEmbeddings } from '@components/types'
import { FC } from 'react'

const Lists: FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedOnDrop }) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");

  return (
      <span className="block block__list">
        <input type="hidden" value="[" />
        {"["}
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText="valor(es)"
            itemsTypes={[
              ItemTypes.EMBEDDED,
              ItemTypes.VARIABLE,
              ItemTypes.NUMBER,
              ItemTypes.STRING,
              ItemTypes.BOOLEAN,
              ItemTypes.ACADENA,
              ItemTypes.ANUMERO,
              ItemTypes.ALOGICO,
              ItemTypes.NULL,
              ItemTypes.LIST,
              ItemTypes.DICT,
              ItemTypes.CONCAT
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
        <input type="hidden" value="]"/>
        {" ]"}
      </span>
    
  );
};

export default Lists;
