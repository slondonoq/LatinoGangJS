import "@assets/stylesheets/components/DataTypes.css";

const NumType = () => {

    return (
      <span className='block block__dataType'>
        <input type="hidden" value="numero" />
        {"Número: "}
        <input type="text" placeholder='número' />
      </span>
    )
  }
  
  export default NumType