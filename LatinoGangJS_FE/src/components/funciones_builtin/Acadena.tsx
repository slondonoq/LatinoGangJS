import "@assets/stylesheets/components/Builtin.css";
import { ItemTypes } from "@components/ItemTypes";
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithEmbeddings } from "@components/types";
import { FC } from "react";

const Acadena: FC<CodeBlockWithEmbeddings> = ({
  embeddedBlock1,
  embeddedOnDrop
}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");

  return (
    <span className="block block__dataType block--embedded">
      <input type="hidden" value="acadena(" />
      {"acadena ("}
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
      <input type="hidden" value=")" />
      {")"}
    </span>
  );
};

export default Acadena;
