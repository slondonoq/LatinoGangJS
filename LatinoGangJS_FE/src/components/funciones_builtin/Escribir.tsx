const Escribir = () => {

    return (
      <span className='block block__builtin'>
        <input type="hidden" value="escribir (" />
        {"escribir ("}
        <input type="text" placeholder='valor' />
        <input type="hidden" value=")" />
        {")"}
      </span>
    )
  }
  
  export default Escribir