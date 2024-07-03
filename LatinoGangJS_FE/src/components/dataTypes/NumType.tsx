import "@assets/stylesheets/components/DataTypes.css";

const NumType = () => {

    return (
      <span className='block block__dataType block--embedded'>
        <input type="hidden" value="numero" />
        <input type='number' placeholder='número' />
      </span>
    )
  }
  
  export default NumType