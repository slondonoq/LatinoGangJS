const ForRangeBlock = () => {

  return (
    <div className='block__iterator--container'>
      <span className='block block__iterator block__sentence'>
        <input type="hidden" value="para" />
        para
        <input type="text" placeholder='elemento'/>
        <input type="hidden" value="en" />
        en
        <input type="text" placeholder='rango'/>
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

export default ForRangeBlock