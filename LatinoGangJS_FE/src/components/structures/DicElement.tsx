import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithNestingAndEmbeddings } from '@components/types'
import { FC } from 'react'

const DicElement: FC<CodeBlockWithNestingAndEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedOnDrop, handleInputs, inputs}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");
  const defaultFunc2 = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");
  return (
    <span className="block block__dicElem block__sentence">
      {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='declaración'
            itemsTypes={[ItemTypes.VARIABLE]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
      <input type="hidden" value=": " />
      {": "}
      {embeddedBlock2 ?? (
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
            itemsTypes={[
              ItemTypes.EMBEDDED,
              ItemTypes.VARIABLE,
              ItemTypes.COMPARISON,
              ItemTypes.FUNCTION_CALL,
              ItemTypes.DICT,
              ItemTypes.LIST
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_2'
          />
        )}
      <input type="hidden" value=", " />
      {", "}
    </span>
  );
};

export default DicElement;
