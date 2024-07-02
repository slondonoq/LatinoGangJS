import "@assets/stylesheets/components/Conditionals.css";
import { ItemTypes } from "@components/ItemTypes";
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithNestingAndEmbeddings } from "@components/types";
import { FC, useState } from "react";
import Block from "@components/dragNdrop/Block";

const CondIf: FC<CodeBlockWithNestingAndEmbeddings> = ({
  embeddedBlock1,
  embeddedOnDrop,
  nestedBlock,
  nestedOnDrop,
}) => {
  const [blocks, setBlocks] = useState<JSX.Element[]>([]);

  const handleNestedOnDrop = (block: CodeBlockWithNestingAndEmbeddings, embedding_spot: string) => {
    setBlocks([...blocks, <Block key={blocks.length} {...block} />]);
    if (nestedOnDrop) nestedOnDrop(block, embedding_spot);
  };

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
        {nestedBlock ?? blocks}
        <BlockPlaceholder
          placeholderText="agregar bloque"
          itemsTypes={[ItemTypes.BLOCK, ItemTypes.IF_NESTING]}
          onDrop={handleNestedOnDrop}
          embedding_spot="emb_child_2"
        />
      </span>
      <div className="block block__condif block__condif--end block__sentence">
        <input type="hidden" value="fin" />
        {"fin"}
      </div>
    </div>
  );
};

export default CondIf;
