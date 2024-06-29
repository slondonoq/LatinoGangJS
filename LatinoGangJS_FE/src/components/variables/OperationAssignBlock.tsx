const OperationAssignBlock = (props:any) => {
  
  return(
    <span className='block block__assign block__sentence'>
      <input type="text" placeholder='variable'/>
      {
        props.assign_operator ?
        <>
          <input type="hidden" value={props.assign_operator} />
          {props.assign_operator}
        </> :
        <>
          <select>
            <option value="+="> += </option>
            <option value="-="> -= </option>
            <option value="*="> *= </option>
            <option value="/="> /= </option>
            <option value="%="> %= </option>
          </select>
        </>
      }
      
      <input type="text" placeholder='valor'/>
    </span>
  )
}

export default OperationAssignBlock