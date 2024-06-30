const Negation = () => {


    return (
      <span className='block block__negation'>
        <input type="hidden" value="!" />
        {"!"}
        {
          <input type="text" placeholder='valor'/>
        }
        <input type="hidden" value=")" />
      </span>
    )
  }
      
    
    export default Negation;