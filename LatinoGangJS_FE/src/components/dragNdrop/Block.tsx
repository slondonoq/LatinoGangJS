import React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { CodeBlock } from "@components/types.tsx";
import { ItemTypes } from "@components/ItemTypes.tsx";
import Declaration from "@components/operators/Declaration";
import Variable from "@components/variables/Variable";
const AssignBlock = React.lazy(
  () => import("@components/variables/AssignBlock")
);
const FormBlock = React.lazy(() => import("@components/FormBlock"));
const BinaryLogicOperator = React.lazy(
  () => import("@components/operators/BinaryLogicOperator")
);
const BinaryOperator = React.lazy(
  () => import("@components/operators/BinaryOperator")
);
const OperationAssignBlock = React.lazy(
  () => import("@components/variables/OperationAssignBlock")
);
const IncrementDecrement = React.lazy(
  () => import("@components/operators/IncrementDecrement")
);
const Negation = React.lazy(() => import("@components/operators/Negation"));
const Anumero = React.lazy(
  () => import("@components/funciones_builtin/Anumero")
);
const Acadena = React.lazy(
  () => import("@components/funciones_builtin/Acadena")
);
const Alogico = React.lazy(
  () => import("@components/funciones_builtin/Alogico")
);
const Imprimirf = React.lazy(
  () => import("@components/funciones_builtin/Imprimirf")
);
const Imprimir = React.lazy(
  () => import("@components/funciones_builtin/Imprimir")
);
const Escribir = React.lazy(
  () => import("@components/funciones_builtin/Escribir")
);
const Poner = React.lazy(() => import("@components/funciones_builtin/Poner"));
const Tipo = React.lazy(() => import("@components/funciones_builtin/Tipo"));
const Limpiar = React.lazy(
  () => import("@components/funciones_builtin/Limpiar")
);
const CondIf = React.lazy(() => import("@components/conditionals/CondIf"));
const CondElseIf = React.lazy(
  () => import("@components/conditionals/CondElseIf")
);
const CondElse = React.lazy(() => import("@components/conditionals/CondElse"));
const CondSwitch = React.lazy(
  () => import("@components/conditionals/CondSwitch")
);
const CondCase = React.lazy(() => import("@components/conditionals/CondCase"));
const CondDefecto = React.lazy(
  () => import("@components/conditionals/CondDefecto")
);
const CondOtro = React.lazy(() => import("@components/conditionals/CondOtro"));
const Romper = React.lazy(() => import("@components/conditionals/Romper"));
const ForRangeBlock = React.lazy(
  () => import("@components/iterators/ForRangeBlock")
);
const ForBlock = React.lazy(() => import("@components/iterators/ForBlock"));
const RangeBlock = React.lazy(() => import("@components/iterators/RangeBlock"));
const WhileBlock = React.lazy(() => import("@components/iterators/WhileBlock"));
const DoWhileBlock = React.lazy(
  () => import("@components/iterators/DoWhileBlock")
);
const FunctionBlock = React.lazy(
  () => import("@components/functions/FunctionBlock")
);
const AnonymousFunBlock = React.lazy(
  () => import("@components/functions/AnonymousFunBlock")
);
const ReturnBlock = React.lazy(
  () => import("@components/functions/ReturnBlock")
);
const FunCall = React.lazy(() => import("@components/functions/FunCall"));
const Lists = React.lazy(() => import("@components/structures/Lists"));
const AccederElemento = React.lazy(
  () => import("@components/structures/AccederElemento")
);
const Dictionaries = React.lazy(
  () => import("@components/structures/Dictionaries")
);
const DicElement = React.lazy(
  () => import("@components/structures/DicElement")
);

const Block: React.FC<CodeBlock> = ({
  id,
  additional_content,
  name,
  blockTypes,
  embeddedBlock1,
  embeddedBlock2,
  embeddedBlock3,
  embeddedOnDrop,
  handleInputs,
  inputs,
  nestedBlock,
  nestedOnDrop,
  variableName,
}) => {
  // TODO: Add more Item Types and a function to assign them based on blockTypes content
  const [{ isDragging }, drag] = useDrag(() => ({
    type: blockTypes.includes("range")
      ? ItemTypes.RANGE
      : blockTypes.includes("variable") 
      ? ItemTypes.VARIABLE
      : blockTypes.includes("comparison")
      ? ItemTypes.COMPARISON
      : blockTypes.includes("declaration")
      ? ItemTypes.DECLARATION
      : blockTypes.includes("embedded")
      ? ItemTypes.EMBEDDED
      : ItemTypes.BLOCK,
    item: { id, name, blockTypes, variableName },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const renderBlockByName = (name: string) => {
    // TODO: place props on blocks after binary operator
    if (name === "code_start") {
      return <FormBlock />;
    } else if (name === "variable") {
      //console.log(variableName,name,blockTypes)
      return <Variable variableName={variableName ?? ''}/>;
    }else if (name === "assignation") {
      return (
        <AssignBlock
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "op_assignation") {
      return <OperationAssignBlock />;
    } else if (name === "binary_operator") {
      return (
        <BinaryOperator
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "inc_dec") {
      return <IncrementDecrement />;
    } else if (name === "negation") {
      return <Negation />;
    } else if (name === "declaration") {
      return <Declaration />;
    } else if (name === "binary_logic-op") {
      return <BinaryLogicOperator />;
    } else if (name === "to_number") {
      return <Anumero />;
    } else if (name === "to_string") {
      return <Acadena />;
    } else if (name === "to_boolean") {
      return <Alogico />;
    } else if (name === "print_f") {
      return <Imprimirf />;
    } else if (name === "print") {
      return <Imprimir />;
    } else if (name === "write") {
      return <Escribir />;
    } else if (name === "put") {
      return <Poner />;
    } else if (name === "type") {
      return <Tipo />;
    } else if (name === "clean") {
      return <Limpiar />;
    } else if (name === "cond_if") {
      return (
        <CondIf
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          nestedBlock={nestedBlock}
          nestedOnDrop={nestedOnDrop}
        />
      );
    } else if (name === "cond_elif") {
      return <CondElseIf 
        embeddedBlock1={embeddedBlock1}
        embeddedOnDrop={embeddedOnDrop}
        nestedBlock={nestedBlock}
        nestedOnDrop={nestedOnDrop}
      />;
    } else if (name === "cond_else") {
      return <CondElse />;
    } else if (name === "switch") {
      return <CondSwitch />;
    } else if (name === "switch_case") {
      return <CondCase />;
    } else if (name === "switch_def") {
      return <CondDefecto />;
    } else if (name === "switch_other") {
      return <CondOtro />;
    } else if (name === "break") {
      return <Romper />;
    } else if (name === "for") {
      return (
        <ForBlock
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedBlock3={embeddedBlock3}
          embeddedOnDrop={embeddedOnDrop}
          nestedBlock={nestedBlock}
          nestedOnDrop={nestedOnDrop}
        />
      );
    } else if (name === "for_range") {
      return (
        <ForRangeBlock
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedOnDrop={embeddedOnDrop}
          nestedBlock={nestedBlock}
          nestedOnDrop={nestedOnDrop}
        />
      );
    } else if (name === "range_1") {
      return <RangeBlock range_n_values={1} />;
    } else if (name === "range_2") {
      return <RangeBlock range_n_values={2} />;
    } else if (name === "range_3") {
      return <RangeBlock range_n_values={3} />;
    } else if (name === "while") {
      return (
        <WhileBlock
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          nestedBlock={nestedBlock}
          nestedOnDrop={nestedOnDrop}
        />
      );
    } else if (name === "do_while") {
      return (
        <DoWhileBlock
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          nestedBlock={nestedBlock}
          nestedOnDrop={nestedOnDrop}
        />
      );
    } else if (name === "func") {
      return <FunctionBlock />;
    } else if (name === "func_anonymous") {
      return <AnonymousFunBlock />;
    } else if (name === "func_call") {
      return <FunCall />;
    } else if (name === "return") {
      return <ReturnBlock />;
    } else if (name === "list") {
      return <Lists />;
    } else if (name === "list_access") {
      return <AccederElemento />;
    } else if (name === "dict") {
      return <Dictionaries />;
    } else if (name === "dict_elem") {
      return <DicElement />;
    }
  };

  return (
    <div
      ref={drag}
      id={id}
      className={`code-block ${isDragging && "code-block--dragged"}`}
    >
      <React.Suspense fallback={"Cargando bloque ..."}>
        {renderBlockByName(name)}
      </React.Suspense>
      {additional_content}
      {/* TODO: fin block separation can go here when diff block types are defined */}
    </div>
  );
};

export default Block;
