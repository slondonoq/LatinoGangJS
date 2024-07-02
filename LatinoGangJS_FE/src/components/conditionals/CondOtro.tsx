import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithNesting} from '@components/types'
import { FC } from 'react'

const CondOtro:FC<CodeBlockWithNesting> = ({nestedBlock,nestedOnDrop}) => {
  const defaultFunc2 = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");
    return (
        <div className="block__condotro--container">
          <span className="block block__condotro block__sentence">
            <input type="hidden" value=" otro " />
            {" otro "}
          </span>
          <span className="block__condotro--nested-block">
          {nestedBlock ?? (
          <BlockPlaceholder
            placeholderText=""
            itemsTypes={[ItemTypes.BLOCK]}
            onDrop={nestedOnDrop ? nestedOnDrop : defaultFunc2}
            embedding_spot="emb_child_1"
          />
        )}
          </span>
          <div className="block block__condotro block__condotro--end block__sentence">
          </div>
        </div>
      );
    }
  
  export default CondOtro;