import BlockPlaceholder from '@components/BlockPlaceholder'

const AssignBlock = () => {
  
  return(
    <span className='block block__assign block__sentence'>
      <BlockPlaceholder placeholderText={'variable'}/>
      <input type="hidden" value="=" /> 
      = 
      <BlockPlaceholder placeholderText={'valor'}/>
    </span>
  )
}

export default AssignBlock