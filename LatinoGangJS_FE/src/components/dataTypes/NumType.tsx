import "@assets/stylesheets/components/DataTypes.css";

const NumType = () => {

    return (
      <span className='block block__dataType block--embedded'>
        <input type="hidden" />
        <input type="number" step="0.01" placeholder='número' />
      </span>
    )
  }
  
  export default NumType