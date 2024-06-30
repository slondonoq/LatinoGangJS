import "@assets/stylesheets/components/Builtin.css";

const Acadena = () => {

    return (
      <span className='block block__builtin'>
        <input type="hidden" value="acadena (" />
        {"acadena ("}
        <input type="text" placeholder='valor' />
        <input type="hidden" value=")" />
        {")"}
      </span>
    )
  }
  
  export default Acadena