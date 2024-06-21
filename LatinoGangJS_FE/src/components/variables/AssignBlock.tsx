const AssignBlock = () => {
  
  return(
    <span className='block block__assign block__sentence'>
      <input type="text" placeholder='variable(s)'/>
      <input type="hidden" value="=" /> 
      = 
      <input type="text" placeholder='valor(es)'/>
    </span>
  )
}

export default AssignBlock