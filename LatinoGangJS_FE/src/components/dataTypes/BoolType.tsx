const BoolType = () => {

    return(
      <span className='block block__dataType block--embedded'>
        {
            <select>
              <option value="verdadero"> verdadero </option>
              <option value="falso"> falso </option>
            </select>
        }
      </span>
    )
  }
  
  export default BoolType