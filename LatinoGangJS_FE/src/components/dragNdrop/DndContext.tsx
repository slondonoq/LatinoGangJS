import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import React, { ReactNode } from 'react';

interface DndContextProps {
    children: ReactNode;
}

const DndContext: React.FC<DndContextProps> = ({ children }) => {
    return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default DndContext;
