import "@assets/stylesheets/components/AuxiliaryBlocks.css";
import { ItemTypes } from '@components/ItemTypes';
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder';
import { CodeBlockWithEmbeddings } from '@components/types';


const MoreItems: React.FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedOnDrop,handleInputs,inputs}) => {
  const defaultFunc: Function = () => console.log('Oops, forgot to pass onDrop prop to block with embeddings')
 
  return (
    <span className="block block__auxiliary block--embedded">
      {embeddedBlock1 ?? (
        <BlockPlaceholder
          placeholderText='elemento'
          itemsTypes={[ItemTypes.VARIABLE, ItemTypes.CONCAT, ItemTypes.DICT, ItemTypes.LIST]}
          onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
          embedding_spot='emb_child_1'
        />
      )}
      <input type="hidden" value=","/>
      {","}
      {embeddedBlock2 ?? (
        <BlockPlaceholder
          placeholderText='elemento'
          itemsTypes={[ItemTypes.VARIABLE, ItemTypes.CONCAT, ItemTypes.DICT, ItemTypes.LIST]}
          onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
          embedding_spot='emb_child_2'
        />
      )}
    </span>
  );
};
 
  export default MoreItems;
 
