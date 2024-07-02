import React from "react";

interface VariableProps {
    variableName: string;
}

const Variable: React.FC<VariableProps> = ({variableName}) => {
    return (
        <div className="block block__assign block--embedded">
        <input type="hidden" value={variableName}/>
        {variableName}
        </div>
    );
    }
export default Variable;