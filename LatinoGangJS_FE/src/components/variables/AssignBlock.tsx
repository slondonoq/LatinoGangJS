import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithEmbeddings } from "@components/types.tsx";
import { ItemTypes } from "@components/ItemTypes.tsx";

const AssignBlock: React.FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedOnDrop,handleInputs ,inputs}) => {
  const defaultFunc: Function = () => console.log('Oops, forgot to pass onDrop prop to block with embeddings')
  const defaultFunc2: Function = () => console.log('Oops, forgot to pass handleInputs prop to block with inputs')
  return (
    <span className="block block__assign block__sentence">
      {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='variable'
            itemsTypes={[ItemTypes.VARIABLE]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
      <input type="hidden" value="=" />=
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
                    : (_) => defaultFunc2()
                  } 
                />
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
    </span>
  );
};

export default AssignBlock;
