import { ItemTypes } from "@components/ItemTypes"
import BlockPlaceholder from "@components/dragNdrop/BlockPlaceholder"

const BinaryOperator = (props:any) => {

  return(
    <span className='block block__operator'>
      <input type="text" placeholder='valor'/>
      {
        props.operator ?
        <>
          <input type="hidden" value={props.operator} />
          {props.operator}
        </> :
        <>
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
        </>
      }
      <BlockPlaceholder placeholderText="valor" itemsTypes={[ItemTypes.SENTENCE]}/>
    </span>
  )
}

export default BinaryOperator