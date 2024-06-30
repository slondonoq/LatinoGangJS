import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder";
import { CodeBlockWithEmbeddings } from "@components/types.tsx";
import { ItemTypes } from "@components/ItemTypes.tsx";
import Block from '@components/dragNdrop/Block';

const AssignBlock: React.FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedOnDrop }) => {
  // console.log(embeddedOnDrop)
  const defaultFunc: Function = () => console.log('Oops, forgot to pass onDrop prop to block with embeddings')

  return (
    <span className="block block__assign block__sentence">
      {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='variables'
            itemsTypes={[ItemTypes.EMBEDDED]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
      <input type="hidden" value="=" />=
      {embeddedBlock2 ?? (
          <BlockPlaceholder
            defaultContent={<><input type="text" placeholder='valor'/></>}
            itemsTypes={[ItemTypes.EMBEDDED]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_2'
          />
        )}
    </span>
  );
};

export default AssignBlock;
