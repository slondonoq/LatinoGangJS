import "@assets/stylesheets/components/Functions.css";
import { ItemTypes } from "@components/ItemTypes"
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder"
import { CodeBlockWithEmbeddings } from '@components/types'
import { FC } from 'react'

const ReturnBlock: FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedOnDrop }) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");
  return (
    <div className="block__function--container">
      <span className="block block__function block__function--return block__sentence">
        <input type="hidden" value="retornar" />
        {"retornar"}
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='valor(es)'
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
              ItemTypes.LIST,
              ItemTypes.FUNCTION_CALL,
              ItemTypes.EMBEDDED
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
      </span>
    </div>
  );
};

export default ReturnBlock;
