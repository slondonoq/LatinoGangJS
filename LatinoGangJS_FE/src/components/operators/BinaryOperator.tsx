import { ItemTypes } from "@components/ItemTypes"
import Block from '@components/dragNdrop/Block'
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder"
import { CodeBlockWithEmbeddings } from '@components/types'
import { FC } from 'react'

const BinaryOperator: FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1, embeddedBlock2, embeddedBlock3, embeddedOnDrop,handleInputs,inputs}) => {
  //console.log(embeddedOnDrop)
  const defaultFunc: Function = () => console.log('Oops, forgot to pass onDrop prop to block with embeddings')
  const defaultFunc2: Function = () => console.log('Oops, forgot to pass handleInputs prop to block with inputs')
  return(
    <span className='block block__operator'>
      {embeddedBlock1 ?? (
          <BlockPlaceholder
            defaultContent={<><input type="text" placeholder='valor' value={inputs ? inputs[0] : undefined} onBlur={handleInputs ? (event) => handleInputs(0,event.target.value) : defaultFunc2}/></>}
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
            defaultContent={<><input type="text" placeholder='valor' value={inputs ? inputs[1] : undefined} onBlur={handleInputs ? (event) => handleInputs(1,event.target.value):defaultFunc2}/></>}
            itemsTypes={[ItemTypes.EMBEDDED]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_2'
          />
        )}
    </span>
  )
}

export default BinaryOperator