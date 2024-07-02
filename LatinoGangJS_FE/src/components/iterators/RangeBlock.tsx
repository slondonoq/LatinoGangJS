const RangeBlock = (props:any = 1) => {
  const input:string[] = props.inputs
  const handleInputs = props.handleInputs
  const defaultFunc2: Function = () => console.log('Oops, forgot to pass handleInputs prop to block with inputs')
  return (
    <span className='block block__iterator block__iterator--range'>
      <input type="hidden" value="rango (" />
      {"rango ("}
      {
        props.range_n_values == 1 && <input type="text" placeholder='fin' defaultValue={input?input[1]:undefined} onBlur={handleInputs?(event) => handleInputs(1,event.target.value):(_)=>defaultFunc2()}/>
      }
      {
        props.range_n_values == 2 && <>
          <input type="text" placeholder='inicio' defaultValue={input?input[0]:undefined} onBlur={handleInputs?(event) => handleInputs(0,event.target.value):(_)=>defaultFunc2()}/>
          <input type="hidden" value="," />
          ,
          <input type="text" placeholder='fin' defaultValue={input?input[1]:undefined} onBlur={handleInputs?(event) => handleInputs(1,event.target.value):(_)=>defaultFunc2()}/>
        </>
      }
      {
        props.range_n_values == 3 && <>
          <input type="text" placeholder='inicio' defaultValue={input?input[0]:undefined} onBlur={handleInputs?(event) => handleInputs(0,event.target.value):(_)=>defaultFunc2()}/>
          <input type="hidden" value="," />
          ,
          <input type="text" placeholder='fin' defaultValue={input?input[1]:undefined} onBlur={handleInputs?(event) => handleInputs(1,event.target.value):(_)=>defaultFunc2()}/>
          <input type="hidden" value="," />
          ,
          <input type="text" placeholder='salto' defaultValue={input?input[2]:undefined} onBlur={handleInputs?(event) => handleInputs(2,event.target.value):(_)=>defaultFunc2()}/>
        </>
      }
      <input type="hidden" value=")" />
      {")"}
    </span>
  )
}

export default RangeBlock