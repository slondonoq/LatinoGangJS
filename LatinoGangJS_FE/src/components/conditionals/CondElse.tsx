import { ItemTypes } from "@components/ItemTypes";
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithNesting } from "@components/types";
import { FC } from "react";

const CondElse: FC<CodeBlockWithNesting> = ({ nestedBlock, nestedOnDrop }) => {
  const defaultFunc2 = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");
  return (
    <div className="block__condelse--container">
      <span className="block block__condelse block__sentence">
        <input type="hidden" value=" sino " />
        {" sino "}
      </span>
      <span className="block__condelse--nested-block">
        {nestedBlock ?? (
          <BlockPlaceholder
            placeholderText=""
            itemsTypes={[ItemTypes.BLOCK]}
            onDrop={nestedOnDrop ? nestedOnDrop : defaultFunc2}
            embedding_spot="emb_child_3"
          />
        )}
      </span>
      <div className="block block__condelse block__condelse--end block__sentence"></div>
    </div>
  );
};

export default CondElse;
