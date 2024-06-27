import BlockPlaceholder from '@components/dragNdrop/BlockPlaceholder'
import {CodeBlock} from "@components/types.tsx";
import {ItemTypes} from "@components/ItemTypes.tsx"
import { useDrop } from 'react-dnd';
import { ReactNode } from 'react';

const AssignBlock = () => {
  const [{ isOver, item },drop] = useDrop({
    accept: ItemTypes.SENTENCE,
    drop: (item) => {
      console.log('Dropped item', item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      item: monitor.getItem()
    })
  });

  
  return(
    <span className='block block__assign block__sentence'>
      <BlockPlaceholder placeholderText={'variable'}/>
      <input type="hidden" value="=" /> 
      = 
      <BlockPlaceholder placeholderText={'valor'} itemsTypes={[ItemTypes.SENTENCE]}/>
    </span>
  )
}

export default AssignBlock