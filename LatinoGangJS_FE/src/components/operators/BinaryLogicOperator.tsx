import { ItemTypes } from '@components/ItemTypes'
import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import { CodeBlockWithEmbeddings } from '@components/types'
import { FC } from 'react'

const BinaryLogicOperator: FC<CodeBlockWithEmbeddings> = ({ embeddedBlock1,embeddedBlock2, embeddedOnDrop,handleInputs,inputs}) => {
  const defaultFunc = () =>
    console.log("Oops, forgot to pass onDrop prop to block with embeddings");
  const defaultFunc2 = () =>
    console.log("Oops, forgot to pass onDrop prop to block with nesting");
  return(
    <span className='block block__operator--logic block--embedded'>
      {embeddedBlock1 ?? (
          <BlockPlaceholder
            placeholderText='valor'
            itemsTypes={[
              ItemTypes.EMBEDDED,
              ItemTypes.VARIABLE,
              ItemTypes.BOOLEAN,
              ItemTypes.ALOGICO,
              ItemTypes.COMPARISON,
              ItemTypes.NUMBER,
              ItemTypes.ANUMERO,
              ItemTypes.STRING,
              ItemTypes.ACADENA,

            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_1'
          />
        )}
      
          <select
          defaultValue={inputs ? inputs[1] : undefined}
          onChange={handleInputs 
            ? (event) => handleInputs(1,event.target.value)
            : (_) => defaultFunc2()}
          >
            <option value=" && "> && </option>
            <option value=" || "> || </option>
            <option value=" == "> == </option>
            <option value=" != "> != </option>
            <option value=" <= "> {"<="} </option>
            <option value=" >= "> {">="} </option>
            <option value=" > "> {">"} </option>
            <option value=" < "> {"<"} </option>
          </select>
        
      
      {embeddedBlock2 ?? (
          <BlockPlaceholder
            placeholderText='valor'
            itemsTypes={[
              ItemTypes.EMBEDDED,
              ItemTypes.VARIABLE,
              ItemTypes.BOOLEAN,
              ItemTypes.ALOGICO,
              ItemTypes.COMPARISON,
              ItemTypes.NUMBER,
              ItemTypes.ANUMERO,
              ItemTypes.STRING,
              ItemTypes.ACADENA,
              
            ]}
            onDrop={embeddedOnDrop ? embeddedOnDrop : defaultFunc}
            embedding_spot='emb_child_2'
          />
        )}
    </span>
  )
}

export default BinaryLogicOperator