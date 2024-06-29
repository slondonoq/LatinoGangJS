const Leer = () => {

    return (
      <span className='block block__builtin'>
        <input type="hidden" value="leer (" />
        {"leer ("}
        <input type="text" placeholder='valor' />
        <input type="hidden" value=")" />
        {")"}
      </span>
    )
  }
  
  export default Leer