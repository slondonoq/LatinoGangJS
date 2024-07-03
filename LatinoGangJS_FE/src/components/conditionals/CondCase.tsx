import { ItemTypes } from "@components/ItemTypes";
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithNestingAndEmbeddings } from "@components/types";
import { FC } from "react";

const CondCase: FC<CodeBlockWithNestingAndEmbeddings> = ({
  embeddedBlock1,
  embeddedOnDrop,
  nestedBlock,
  nestedOnDrop,
}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");

  return (
    <div className="block__condcase--container">
      <span className="block block__condcase block__sentence">
        {"caso"}

        <input type="hidden" value="caso " />

        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText="valor"
            itemsTypes={[
              ItemTypes.VARIABLE,
              ItemTypes.NUMBER,
              ItemTypes.STRING,
              ItemTypes.BOOLEAN,
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot="emb_child_1"
          />
        )}
        

        <input type="hidden" value=": " />
        {": "}
      </span>
      <span className="block__condcase--nested-block">
        {nestedBlock ?? (
          <BlockPlaceholder
            placeholderText=""
            itemsTypes={[ItemTypes.BLOCK]}
            onDrop={nestedOnDrop ? nestedOnDrop : defaultFunc2}
            embedding_spot="emb_child_3"
          />
        )}
      </span>
      <div className="block block__condcase block__condcase--end block__sentence"></div>
    </div>
  );
};

export default CondCase;
