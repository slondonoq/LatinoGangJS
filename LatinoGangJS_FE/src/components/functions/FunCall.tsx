import { ItemTypes } from "@components/ItemTypes";
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithNestingAndEmbeddings } from "@components/types";
import { FC } from "react";

const FunCall: FC<CodeBlockWithNestingAndEmbeddings> = ({
  embeddedBlock1,
  embeddedBlock2,
  embeddedOnDrop,
  isSentence
}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");

  return (
    <span className={`block block__function block__function--call ${isSentence ? 'block__sentence': ''}`}>
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
          placeholderText="argumentos"
          itemsTypes={[
            ItemTypes.EMBEDDED,
            ItemTypes.VARIABLE,
            ItemTypes.COMPARISON,
            ItemTypes.FUNCTION_CALL,
            ItemTypes.DICT,
            ItemTypes.LIST,
            ItemTypes.CONCAT
          ]}
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
