import { ItemTypes } from "@components/ItemTypes";
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithEmbeddings } from "@components/types";
import { FC } from "react";

const OperationAssignBlock: FC<CodeBlockWithEmbeddings> = ({
  embeddedBlock1,
  embeddedBlock2,
  embeddedOnDrop,
  handleInputs,
  inputs,
  isSentence
}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");
  const defaultFunc2 = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");
  return (
    <span className={`block ${isSentence ? 'block__assign block__sentence': 'block__iterator block--embedded'}`}>
      {embeddedBlock1 ?? (
        <BlockPlaceholder
          placeholderText="variable"
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
        <option value=" += "> += </option>
        <option value=" -= "> -= </option>
        <option value=" *= "> *= </option>
        <option value=" /= "> /= </option>
        <option value=" %= "> %= </option>
      </select>

      {embeddedBlock2 ?? (
        <BlockPlaceholder
          placeholderText="valor"
          itemsTypes={[ItemTypes.EMBEDDED, ItemTypes.VARIABLE, ItemTypes.NUMBER, ItemTypes.ANUMERO]}
          onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
          embedding_spot="emb_child_2"
        />
      )}
      <input type="hidden" value=" " />
    </span>
  );
};

export default OperationAssignBlock;
