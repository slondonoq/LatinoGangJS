import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithNestingAndEmbeddings } from '@components/types'
import { FC } from 'react'

const ForRangeBlock: FC<CodeBlockWithNestingAndEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedOnDrop, nestedBlock, nestedOnDrop}) => {
  const defaultFunc = () => console.log('Oops, forgot to pass onDrop prop to block with embeddings')
  const defaultFunc2 = () => console.log('Oops, forgot to pass onDrop prop to block with nesting')
  return (
    <div className="block__iterator--container">
      <span className="block block__iterator block__sentence">
        <input type="hidden" value="para" />
        para
        {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText="variable"
            itemsTypes={[ItemTypes.VARIABLE]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot="emb_child_1"
          />
        )}
        <input type="hidden" value="en" />
        en
        {embeddedBlock2 ?? (
          <BlockPlaceholder
            placeholderText="rango"
            itemsTypes={[ItemTypes.RANGE]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot="emb_child_2"
          />
        )}
      </span>
      <span className="block__iterator--nested-block">
        {nestedBlock ?? (
          <BlockPlaceholder
            placeholderText=""
            itemsTypes={[ItemTypes.BLOCK]}
            onDrop={nestedOnDrop ? nestedOnDrop : defaultFunc2}
            embedding_spot="emb_child_3"
          />
        )}
      </span>
      <div className="block block__iterator block__iterator--end block__sentence">
        <input type="hidden" value="fin" />
      </div>
    </div>
  );
};

export default ForRangeBlock;
