import { ItemTypes } from "@components/ItemTypes";
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithNesting } from "@components/types";
import { FC } from "react";

const CondDefecto: FC<CodeBlockWithNesting> = ({
  nestedBlock,
  nestedOnDrop,
}) => {
  const defaultFunc2 = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");
  return (
    <div className="block__conddefecto--container">
      <span className="block block__conddefecto block__sentence">
        <input type="hidden" value="defecto " />
        {" defecto "}
      </span>
      <span className="block__conddefecto--nested-block">
        {nestedBlock ?? (
          <BlockPlaceholder
            placeholderText=""
            itemsTypes={[ItemTypes.BLOCK]}
            onDrop={nestedOnDrop ? nestedOnDrop : defaultFunc2}
            embedding_spot="emb_child_1"
          />
        )}
      </span>
      <div className="block block__conddefecto block__conddefecto--end block__sentence"></div>
    </div>
  );
};

export default CondDefecto;
