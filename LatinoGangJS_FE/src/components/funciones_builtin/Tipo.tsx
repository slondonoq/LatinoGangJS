const Tipo = () => {

    return (
      <span className='block block__builtin'>
        <input type="hidden" value="tipo (" />
        {"tipo ("}
        <input type="text" placeholder='valor' />
        <input type="hidden" value=")" />
        {")"}
      </span>
    )
  }
  
  export default Tipo