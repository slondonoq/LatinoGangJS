const Anumero = () => {

    return (
      <span className='block block__builtin'>
        <input type="hidden" value="anumero (" />
        {"anumero ("}
        <input type="text" placeholder='valor' />
        <input type="hidden" value=")" />
        {")"}
      </span>
    )
  }
  
  export default Anumero