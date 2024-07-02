import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithNestingAndEmbeddings } from '@components/types'
import { FC } from 'react'

const Dictionaries: FC<CodeBlockWithNestingAndEmbeddings> = ({ embeddedBlock1, embeddedOnDrop, nestedBlock, nestedOnDrop}) => {
  const defaultFunc = () => console.log('Oops, forgot to pass onDrop prop to block with embeddings')
  const defaultFunc2 = () => console.log('Oops, forgot to pass onDrop prop to block with nesting')
  return (
    <div className="block__dic--container">
      <span className="block block__dic block__sentence">
      {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='variable'
            itemsTypes={[ItemTypes.VARIABLE]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
        <input type="hidden" value="= {"/>
        {"= {"}
      </span>
      <span className="block__dic--nested-block">
      {nestedBlock ?? (
          <BlockPlaceholder
            placeholderText=''
            itemsTypes={[ItemTypes.KEY_VALUE]}
            onDrop={nestedOnDrop ? nestedOnDrop : defaultFunc2}
            embedding_spot='emb_child_2'
          />
        )}
      </span>
      <div className="block block__dic block__dic--end block__sentence">
        <input type="hidden" value="}" />
        {"}"}
      </div>
    </div>
  );
};

export default Dictionaries;
