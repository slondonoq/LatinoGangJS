import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithNesting } from '@components/types'
import { FC } from 'react'

const CondCase: FC<CodeBlockWithNesting> = ({nestedBlock, nestedOnDrop,handleInputs ,inputs}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");
  const defaultFunc2 = () =>
    console.log("Oops, forgot to pass handleInputs prop to block with nesting");
    return (
        <div className="block__condcase--container">
          <span className="block block__condcase block__sentence">
            <input type="hidden" value="caso" />
            {"caso"}
            <input type="text" placeholder="valor" defaultValue={inputs ? inputs[0] : undefined} onBlur={handleInputs
              ? (event) => handleInputs(0,event.target.value)
              : (_) => defaultFunc2()}
            />
            <input type="hidden" value=": " />
            {": "}
          </span>
          <span className="block__condcase--nested-block">
          {nestedBlock ?? (
          <BlockPlaceholder
            placeholderText=''
            itemsTypes={[ItemTypes.BLOCK]}
            onDrop={nestedOnDrop ? nestedOnDrop : defaultFunc}
            embedding_spot='emb_child_3'
          />
        )}
          </span>
          <div className="block block__condcase block__condcase--end block__sentence">
          </div>
        </div>
      );
    }
  
  export default CondCase;