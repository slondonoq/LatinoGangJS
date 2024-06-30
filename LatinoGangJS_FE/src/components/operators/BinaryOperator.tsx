import { ItemTypes } from "@components/ItemTypes"
import Block from '@components/dragNdrop/Block'
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder"
import { CodeBlockWithEmbeddings } from '@components/types'
import { FC } from 'react'

const BinaryOperator: FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedBlock3, embeddedOnDrop}) => {
  //console.log(embeddedOnDrop)
  const defaultFunc: Function = () => console.log('Oops, forgot to pass onDrop prop to block with embeddings')

  return(
    <span className='block block__operator'>
      {embeddedBlock1 ?? (
          <BlockPlaceholder
            defaultContent={<><input type="text" placeholder='valor'/></>}
            itemsTypes={[ItemTypes.EMBEDDED]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
      <select>
        <option value="+"> + </option>
        <option value="-"> - </option>
        <option value="*"> * </option>
        <option value="/"> / </option>
        <option value="%"> % </option>
        <option value="^"> ^ </option>
        <option value=".."> .. </option>
        <option value="~="> ~= </option>
      </select>
      {embeddedBlock2 ?? (
          <BlockPlaceholder
            defaultContent={<><input type="text" placeholder='valor'/></>}
            itemsTypes={[ItemTypes.EMBEDDED]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_2'
          />
        )}
    </span>
  )
}

export default BinaryOperator