const WhileBlock = () => {

  return (
    <div className='block__iterator--container'>
      <span className='block block__iterator block__sentence'>
        <input type="hidden" value="mientras (" />
        {"mientras ("}
        <input type="text" placeholder='condición'/>
        <input type="hidden" value=")" />
        {")"}
      </span>
      <span className='block__iterator--nested-block'>
        {/* Here goes nested block */}
      </span>
      <div className='block block__iterator block__iterator--end block__sentence'>
        <input type="hidden" value="fin" />
      </div>
    </div>
  )
}

export default WhileBlock