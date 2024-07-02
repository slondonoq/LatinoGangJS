const ListType = () => {

    return (
      <span className='block block__dataType block--embedded'>
        <input type="hidden" value="["/>
        {"["}
        <input type="text" placeholder='elementos' />
        <input type="hidden" value="]"/>
        {"]"}
      </span>
    )
  }
  
  export default ListType