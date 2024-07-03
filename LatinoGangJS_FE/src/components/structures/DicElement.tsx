import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithNestingAndEmbeddings } from '@components/types'
import { FC } from 'react'

const DicElement: FC<CodeBlockWithNestingAndEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedOnDrop }) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");

  return (
    <span className="block block__dicElem block__sentence">
      {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='clave'
            itemsTypes={[ItemTypes.VARIABLE]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
      <input type="hidden" value=": " />
      {": "}
      {embeddedBlock2 ?? (
          <BlockPlaceholder
            placeholderText='valor'
            itemsTypes={[
              ItemTypes.EMBEDDED,
              ItemTypes.VARIABLE,
              ItemTypes.COMPARISON,
              ItemTypes.FUNCTION_CALL,
              ItemTypes.DICT,
              ItemTypes.LIST,
              ItemTypes.NUMBER,
              ItemTypes.STRING,
              ItemTypes.BOOLEAN,
              ItemTypes.NULL,
              ItemTypes.ACADENA,
              ItemTypes.ANUMERO,
              ItemTypes.ALOGICO,
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_2'
          />
        )}
      {", "}
    </span>
  );
};

export default DicElement;
