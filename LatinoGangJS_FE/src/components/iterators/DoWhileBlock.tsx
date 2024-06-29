const DoWhileBlock = () => {

  return (
    <div className='block__iterator--container'>
      <span className='block block__iterator block__sentence'>
        <input type="hidden" value="repetir" />
        repetir
      </span>
      <span className='block__iterator--nested-block'>
        {/* Here goes nested block */}
      </span>
      <div className='block block__iterator block__iterator--end block__sentence'>
        {"hasta ("}
        <input type="hidden" value="hasta (" />
        <input type="text" placeholder='condición'/>
        {")"}
        <input type="hidden" value=")" />
      </div>
    </div>
  )
}

export default DoWhileBlock