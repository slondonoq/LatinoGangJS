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
      <input type="text" placeholder='valor'/>
    </span>
  )
}

export default BinaryOperator