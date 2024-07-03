import { ItemTypes } from '@components/ItemTypes';
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder';
import { CodeBlockWithEmbeddings } from '@components/types';

const Properties: React.FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedOnDrop}) => {
  const defaultFunc: Function = () => console.log('Oops, forgot to pass onDrop prop to block with embeddings')
  
  return (
    <span className="block block__dic block--embedded">
      {embeddedBlock1 ?? (
        <BlockPlaceholder
          placeholderText='variable'
          itemsTypes={[ItemTypes.VARIABLE]}
          onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
          embedding_spot='emb_child_1'
        />
      )}
      <input type="hidden" value="."/>
      {"."}
      {embeddedBlock2 ?? (
        <BlockPlaceholder
          placeholderText='clave'
          itemsTypes={[ItemTypes.VARIABLE]}
          onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
          embedding_spot='emb_child_2'
        />
      )}
    </span>
  );
};
  
  export default Properties;