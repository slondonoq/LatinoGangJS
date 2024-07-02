const VarType = () => {

    return (
      <span className='block block__dataType block--embedded'>
        <input type="hidden" value="variable" />
        {"Variable: "}
        <input type="text" placeholder='ID' />
      </span>
    )
  }
  
  export default VarType