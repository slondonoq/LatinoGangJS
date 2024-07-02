import { ItemTypes } from "@components/ItemTypes";
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithEmbeddings } from "@components/types";
import { FC } from "react";

const IncrementDecrement: FC<CodeBlockWithEmbeddings> = (
  { embeddedBlock1, embeddedOnDrop, handleInputs, inputs, isSentence }
) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");
  const defaultFunc2 = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");
  return (
    <span className={`block block__incrementdecrement ${isSentence ? 'block__sentence' : 'block--embedded'}`}>
      {embeddedBlock1 ?? (
        <BlockPlaceholder
          defaultContent={
            <>
              <input
                type="text"
                placeholder="valor"
                defaultValue={inputs ? inputs[0] : undefined}
                onBlur={
                  handleInputs
                    ? (event) => handleInputs(0, event.target.value)
                    : (_) => defaultFunc2()
                }
              />
            </>
          }
          itemsTypes={[ItemTypes.VARIABLE]}
          onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
          embedding_spot="emb_child_1"
        />
      )}

      <select
        defaultValue={inputs ? inputs[1] : undefined}
        onChange={
          handleInputs
            ? (event) => handleInputs(1, event.target.value)
            : (_) => defaultFunc2()
        }
      >
        <option value="++"> ++ </option>
        <option value="--"> -- </option>
      </select>
    </span>
  );
};

export default IncrementDecrement;
