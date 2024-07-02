import "@assets/stylesheets/components/Conditionals.css";
import { ItemTypes } from "@components/ItemTypes";
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithNestingAndEmbeddings } from "@components/types";
import { FC } from "react";

interface conditionalBlock extends CodeBlockWithNestingAndEmbeddings {
  has_alt_conds?: boolean
}

const CondIf: FC<conditionalBlock> = ({
  embeddedBlock1,
  embeddedBlock2,
  embeddedOnDrop,
  nestedBlock,
  nestedOnDrop,
  has_alt_conds
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
            itemsTypes={[ItemTypes.BLOCK]}
            onDrop={nestedOnDrop ? nestedOnDrop : defaultFunc2}
            embedding_spot="emb_child_2"
          />
        )}
      </span>
      
        {has_alt_conds ? embeddedBlock2 ?? (
          <span className='block__condif--alt_block'>
            <BlockPlaceholder
              placeholderText="Condición alterna"
              itemsTypes={[ItemTypes.IF_NESTING]}
              onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
              embedding_spot="emb_child_2"
            />
          </span>
        ): null}
      <div className={`block block__condif block__condif--end block__sentence ${has_alt_conds ? 'block__condif--alt' : ''}`}>
        <input type="hidden" value="fin" />
        {"fin"}
      </div>
    </div>
  );
};

export default CondIf;
