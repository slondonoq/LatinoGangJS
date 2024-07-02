import { ItemTypes } from "@components/ItemTypes";
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithNestingAndEmbeddings } from "@components/types";
import { FC } from "react";

const FunCall: FC<CodeBlockWithNestingAndEmbeddings> = ({
  embeddedBlock1,
  embeddedBlock2,
  embeddedOnDrop,
  handleInputs,
  inputs,
}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");
  const defaultFunc2 = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");
  return (
    <span className="block block__function block__function--call">
      {embeddedBlock1 ?? (
        <BlockPlaceholder
          placeholderText="función"
          itemsTypes={[ItemTypes.VARIABLE]}
          onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
          embedding_spot="emb_child_1"
        />
      )}
      <input type="hidden" value="(" />
      {"("}
      {embeddedBlock2 ?? (
        <BlockPlaceholder
          defaultContent={
            <>
              <input
                type="text"
                placeholder="valor"
                value={inputs ? inputs[2] : undefined}
                onBlur={
                  handleInputs
                    ? (event) => handleInputs(2, event.target.value)
                    : (_) => defaultFunc2()
                }
              />
            </>
          }
          itemsTypes={[ItemTypes.EMBEDDED]}
          onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
          embedding_spot="emb_child_2"
        />
      )}
      <input type="hidden" value=")" />
      {")"}
    </span>
  );
};

export default FunCall;
