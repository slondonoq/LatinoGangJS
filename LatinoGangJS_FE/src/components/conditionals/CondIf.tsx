import "@assets/stylesheets/components/Conditionals.css";
import { ItemTypes } from "@components/ItemTypes";
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithNestingAndEmbeddings } from "@components/types";
import { FC } from "react";

const CondIf: FC<CodeBlockWithNestingAndEmbeddings> = ({
  embeddedBlock1,
  embeddedOnDrop,
  nestedBlock,
  nestedOnDrop,
}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");
  const defaultFunc2 = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");
  return (
    <div className="block__condif--container">
      <span className="block block__condif block__sentence">
        <input type="hidden" value="si" />
        {"si"}
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText="condición"
            itemsTypes={[ItemTypes.COMPARISON]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot="emb_child_1"
          />
        )}
      </span>
      <span className="block__condif--nested-block">
        {nestedBlock ?? (
          <BlockPlaceholder
            placeholderText=""
            itemsTypes={[ItemTypes.BLOCK, ItemTypes.IF_NESTING]}
            onDrop={nestedOnDrop ? nestedOnDrop : defaultFunc2}
            embedding_spot="emb_child_2"
          />
        )}
      </span>
      <div className="block block__condif block__condif--end block__sentence">
        <input type="hidden" value="fin" />
        {"fin"}
      </div>
    </div>
  );
};

export default CondIf;
