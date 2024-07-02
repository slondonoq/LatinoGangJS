import "@assets/stylesheets/components/Functions.css";
import { ItemTypes } from "@components/ItemTypes"
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder"
import { CodeBlockWithNestingAndEmbeddings } from '@components/types'
import { FC } from 'react'

const AnonymousFunBlock: FC<CodeBlockWithNestingAndEmbeddings> = ({ embeddedBlock1, embeddedOnDrop, nestedBlock, nestedOnDrop}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");
  const defaultFunc2 = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");
    return (
      <div className="block__function--container">
        <span className="block block__function block__function--start block__function--anonymous block__sentence">
          <input type="hidden" value="funcion (" />
          {"funcion"}
          {"("}
          {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='arg(s)'
            itemsTypes={[
              ItemTypes.VARIABLE,
              ItemTypes.CONCAT
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
          <input type="hidden" value=")" />
          {")"}
        </span>
        <span className="block__function--nested-block">
        {nestedBlock ?? (
          <BlockPlaceholder
            placeholderText=''
            itemsTypes={[ItemTypes.BLOCK]}
            onDrop={nestedOnDrop ? nestedOnDrop : defaultFunc2}
            embedding_spot='emb_child_3'
          />
        )}
        </span>
        <div className="block block__function block__function--end block__function--anonymous block__sentence">
          <input type="hidden" value="fin" />
          {"fin"}
        </div>
      </div>
    );
  }
  
  export default AnonymousFunBlock