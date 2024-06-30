const VarType = () => {

    return (
      <span className='block block__dataType'>
        <input type="hidden" value="variable" />
        {"Variable: "}
        <input type="text" placeholder='ID' />
      </span>
    )
  }
  
  export default VarType