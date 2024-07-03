const StringType = () => {

    return (
      <span className='block block__dataType block--embedded'>
        <input type="hidden" value={"\""}/>
        {"\""}
        <input type="text" placeholder='texto' />
        <input type="hidden" value={"\""}/>
        {"\""}
      </span>
    )
  }
  
  export default StringType