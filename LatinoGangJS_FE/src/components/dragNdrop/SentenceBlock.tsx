
import { useDrag, DragSourceMonitor } from "react-dnd";
import {CodeBlock} from "@components/types.tsx";

import React from "react";
import {ItemTypes} from "@components/ItemTypes.tsx";

const SentenceBlock: React.FC<CodeBlock>  = ({ content, id, index, delFunction, replaceFunction }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.SENTENCE,
        item: { id, content, index, delFunction, replaceFunction },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    
    return (
        <div ref={drag} id={id} className={`code-block ${isDragging && "code-block--dragged"}`}>
        {content}
        </div>
    );
    };

export default SentenceBlock;