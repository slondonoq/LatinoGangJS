const Imprimir = () => {

    return (
      <span className='block block__builtin'>
        <input type="hidden" value="imprimir (" />
        {"imprimir ("}
        <input type="text" placeholder='valor' />
        <input type="hidden" value=")" />
        {")"}
      </span>
    )
  }
  
  export default Imprimir