const Poner = () => {

    return (
      <span className='block block__builtin'>
        <input type="hidden" value="poner (" />
        {"poner ("}
        <input type="text" placeholder='valor' />
        <input type="hidden" value=")" />
        {")"}
      </span>
    )
  }
  
  export default Poner