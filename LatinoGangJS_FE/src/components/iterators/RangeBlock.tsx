import { CodeBlockWithEmbeddings } from '@components/types'
import React from 'react'

interface rangeBlock extends CodeBlockWithEmbeddings {
  range_n_values: number
}

const RangeBlock: React.FC<rangeBlock> = ({
  range_n_values,
  inputs,
  handleInputs
}) => {
  const defaultFunc2: Function = () => console.log('Oops, forgot to pass handleInputs prop to block with inputs')
  return (
    <span className='block block__iterator block__iterator--range block--embedded'>
      <input type="hidden" value="rango (" />
      {"rango ("}
      {
        range_n_values == 1 && <input type="text" placeholder='fin' defaultValue={inputs?inputs[1]:undefined} onBlur={handleInputs?(event) => handleInputs(1,event.target.value):(_)=>defaultFunc2()}/>
      }
      {
        range_n_values == 2 && <>
          <input type="number" placeholder='inicio' defaultValue={inputs?inputs[0]:undefined} onBlur={handleInputs?(event) => handleInputs(0,event.target.value):(_)=>defaultFunc2()}/>
          <input type="hidden" value="," />
          ,
          <input type="number" placeholder='fin' defaultValue={inputs?inputs[1]:undefined} onBlur={handleInputs?(event) => handleInputs(1,event.target.value):(_)=>defaultFunc2()}/>
        </>
      }
      {
        range_n_values == 3 && <>
          <input type="number" placeholder='inicio' defaultValue={inputs?inputs[0]:undefined} onBlur={handleInputs?(event) => handleInputs(0,event.target.value):(_)=>defaultFunc2()}/>
          <input type="hidden" value="," />
          ,
          <input type="number" placeholder='fin' defaultValue={inputs?inputs[1]:undefined} onBlur={handleInputs?(event) => handleInputs(1,event.target.value):(_)=>defaultFunc2()}/>
          <input type="hidden" value="," />
          ,
          <input type="number" placeholder='salto' defaultValue={inputs?inputs[2]:undefined} onBlur={handleInputs?(event) => handleInputs(2,event.target.value):(_)=>defaultFunc2()}/>
        </>
      }
      <input type="hidden" value=") " />
      {")"}
    </span>
  )
}

export default RangeBlock