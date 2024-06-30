const Imprimirf = () => {

    return (
      <span className='block block__builtin'>
        <input type="hidden" value="imprimirf (" />
        {"imprimirf ("}
        <input type="text" placeholder='valores' />
        <input type="hidden" value=")" />
        {")"}
      </span>
    )
  }
  
  export default Imprimirf