const IncrementDecrement = (props:any) => {

    return(
        <span className='block block__incrementdecrement'>
          <input type="text" placeholder='valor'/>
          {
            props.incrementdecrement ?
            <>
              <input type="hidden" value={props.incrementdecrement} />
              {props.incrementdecrement}
            </> :
            <>
              <select>
                <option value="++"> ++ </option>
                <option value="--"> -- </option>
              </select>
            </>
          }
        </span>
      )
    }
    
  
  export default IncrementDecrement;