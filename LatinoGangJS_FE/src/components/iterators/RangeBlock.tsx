const RangeBlock = (props:any = 1) => {

  return (
    <span className='block block__iterator block__iterator--range'>
      <input type="hidden" value="rango (" />
      {"rango ("}
      {
        props.range_n_values == 1 && <input type="text" placeholder='fin'/>
      }
      {
        props.range_n_values == 2 && <>
          <input type="number" placeholder='inicio'/>
          <input type="hidden" value="," />
          ,
          <input type="number" placeholder='fin'/>
        </>
      }
      {
        props.range_n_values == 3 && <>
          <input type="number" placeholder='inicio'/>
          <input type="hidden" value="," />
          ,
          <input type="number" placeholder='fin'/>
          <input type="hidden" value="," />
          ,
          <input type="number" placeholder='salto'/>
        </>
      }
      <input type="hidden" value=")" />
      {")"}
    </span>
  )
}

export default RangeBlock