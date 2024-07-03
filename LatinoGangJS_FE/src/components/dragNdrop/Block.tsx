import React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { CodeBlock } from "@components/types.tsx";
import { ItemTypes } from "@components/ItemTypes.tsx";
const Declaration = React.lazy(
  () => import("@components/operators/Declaration")
);
const Variable = React.lazy(
  () => import("@components/variables/Variable")
);
const AssignBlock = React.lazy(
  () => import("@components/variables/AssignBlock")
);
const TranslationBlock = React.lazy(
  () => import("@components/TranslationBlock")
);
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
const NumType = React.lazy(
  () => import('@components/dataTypes/NumType')
);
const StringType = React.lazy(
  () => import('@components/dataTypes/StringType')
);

const NullType = React.lazy(
  () => import('@components/dataTypes/NullType')
);
const BoolType = React.lazy(
  () => import('@components/dataTypes/BoolType')
);
const MoreItems = React.lazy(
  () => import('@components/auxiliaryBlocks/MoreItems')
);
const Properties = React.lazy(
  () => import('@components/auxiliaryBlocks/Properties')
);
const ArgumentList = React.lazy(
  () => import('@components/functions/ArgumentList')
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
  isSentence
}) => {
  // TODO: Add more Item Types and a function to assign them based on blockTypes content
  const [{ isDragging }, drag] = useDrag(() => ({
    type: blockTypes.includes("function_call")
      ? ItemTypes.FUNCTION_CALL
      : blockTypes.includes("embedded_sentence")
      ? ItemTypes.EMBEDDED_SENTENCE
      : blockTypes.includes("anumero")
      ? ItemTypes.ANUMERO
      : blockTypes.includes("acadena")
      ? ItemTypes.ACADENA
      : blockTypes.includes("alogico")
      ? ItemTypes.ALOGICO
      : blockTypes.includes("number")
      ? ItemTypes.NUMBER
      : blockTypes.includes("string")
      ? ItemTypes.STRING
      : blockTypes.includes("boolean")
      ? ItemTypes.BOOLEAN
      : blockTypes.includes("null")
      ? ItemTypes.NULL
      : blockTypes.includes("list")
      ? ItemTypes.LIST
      : blockTypes.includes("dict")
      ? ItemTypes.DICT
      : blockTypes.includes("concat")
      ? ItemTypes.CONCAT
      : blockTypes.includes("range")
      ? ItemTypes.RANGE
      : blockTypes.includes("key_value")
      ? ItemTypes.KEY_VALUE
      : blockTypes.includes("if_nesting")
      ? ItemTypes.IF_NESTING
      : blockTypes.includes("switch")
      ? ItemTypes.SWITCH
      : blockTypes.includes("variable")
      ? ItemTypes.VARIABLE
      : blockTypes.includes("comparison")
      ? ItemTypes.COMPARISON
      : blockTypes.includes("declaration")
      ? ItemTypes.DECLARATION
      : blockTypes.includes("argument_list")
      ? ItemTypes.ARGUMENT_LIST
      : blockTypes.includes("embedded")
      ? ItemTypes.EMBEDDED
      : ItemTypes.BLOCK,
    item: { id, name, blockTypes, variableName, isSentence },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const renderBlockByName = (name: string) => {
    // TODO: place props on blocks after binary operator
    if (name === "code_start") {
      return <TranslationBlock />;
    } else if (name === "variable") {
      // Default name ensures block preview works correctly
      return <Variable variableName={variableName ?? "my_variable"} />;
    } else if (name === "assignation") {
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
      return (
        <OperationAssignBlock
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
          isSentence={isSentence}
        />
      );
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
      return (
        <IncrementDecrement
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
          isSentence={isSentence}
        />
      );
    } else if (name === "negation") {
      return (
        <Negation
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "declaration") {
      return (
        <Declaration
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "binary_logic-op") {
      return (
        <BinaryLogicOperator
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "to_number") {
      return (
        <Anumero
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "to_string") {
      return (
        <Acadena
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "to_boolean") {
      return (
        <Alogico
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "print_f") {
      return (
        <Imprimirf
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "print") {
      return (
        <Imprimir
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "write") {
      return (
        <Escribir
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "put") {
      return (
        <Poner
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "type") {
      return (
        <Tipo
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
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
    } else if (name === "cond_if_alt") {
      return (
        <CondIf
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedOnDrop={embeddedOnDrop}
          nestedBlock={nestedBlock}
          nestedOnDrop={nestedOnDrop}
          has_alt_conds={true}
        />
      );
    } else if (name === "cond_elif") {
      return (
        <CondElseIf
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          nestedBlock={nestedBlock}
          nestedOnDrop={nestedOnDrop}
        />
      );
    } else if (name === "cond_else") {
      return <CondElse nestedBlock={nestedBlock} nestedOnDrop={nestedOnDrop} />;
    } else if (name === "switch") {
      return (
        <CondSwitch
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          nestedBlock={nestedBlock}
          nestedOnDrop={nestedOnDrop}
        />
      );
    } else if (name === "switch_case") {
      return <CondCase 
      embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
      nestedBlock={nestedBlock} nestedOnDrop={nestedOnDrop} />;
    } else if (name === "switch_def") {
      return (
        <CondDefecto nestedBlock={nestedBlock} nestedOnDrop={nestedOnDrop} />
      );
    } else if (name === "switch_other") {
      return <CondOtro nestedBlock={nestedBlock} nestedOnDrop={nestedOnDrop} />;
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
      return <RangeBlock
        range_n_values={1}
        inputs={inputs}
        handleInputs={handleInputs}
      />;
    } else if (name === "range_2") {
      return <RangeBlock
        range_n_values={2}
        inputs={inputs}
        handleInputs={handleInputs}
      />;
    } else if (name === "range_3") {
      return <RangeBlock
        range_n_values={3}
        inputs={inputs}
        handleInputs={handleInputs}
      />;
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
      return (
        <FunctionBlock
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedOnDrop={embeddedOnDrop}
          nestedBlock={nestedBlock}
          nestedOnDrop={nestedOnDrop}
        />
      );
    } else if (name === "func_anonymous") {
      return (
        <AnonymousFunBlock
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          nestedBlock={nestedBlock}
          nestedOnDrop={nestedOnDrop}
        />
      );
    } else if (name === "func_call") {
      return (
        <FunCall
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
          isSentence={isSentence}
        />
      );
    } else if (name === "return") {
      return (
        <ReturnBlock nestedBlock={nestedBlock} nestedOnDrop={nestedOnDrop} />
      );
    } else if (name === "list") {
      return (
        <Lists
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    } else if (name === "list_access") {
      return (
        <AccederElemento
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedOnDrop={embeddedOnDrop}
        />
      );
    } else if (name === "dict") {
      return (
        <Dictionaries
          embeddedBlock1={embeddedBlock1}
          embeddedOnDrop={embeddedOnDrop}
          nestedBlock={nestedBlock}
          nestedOnDrop={nestedOnDrop}
        />
      );
    } else if (name === "dict_elem") {
      return (
        <DicElement
          embeddedBlock1={embeddedBlock1}
          embeddedBlock2={embeddedBlock2}
          embeddedOnDrop={embeddedOnDrop}
          handleInputs={handleInputs}
          inputs={inputs}
        />
      );
    }
    else if(name === 'numType') {
      return <NumType/>
    }
    else if(name === 'stringType') {
      return <StringType/>
    }
    else if(name === 'nullType') {
      return <NullType/>
    }
    else if(name === 'boolType') {
      return <BoolType/>
    }
    else if(name === 'moreItems') {
      return <MoreItems
        embeddedBlock1={embeddedBlock1}
        embeddedBlock2={embeddedBlock2}
        embeddedOnDrop={embeddedOnDrop}
      />
    }
    else if(name === 'properties') {
      return <Properties
        embeddedBlock1={embeddedBlock1}
        embeddedBlock2={embeddedBlock2}
        embeddedOnDrop={embeddedOnDrop}
      />
    }
    else if(name === 'argumentList') {
      return <ArgumentList
        embeddedBlock1={embeddedBlock1}
        embeddedBlock2={embeddedBlock2}
        embeddedOnDrop={embeddedOnDrop}
      />
    }
  };

  return (
    <div
      ref={drag}
      id={id}
      className={`code-block ${isDragging ? "code-block--dragged" : ""}${nestedBlock ? " block--with_nested_elems": ""}`}
    >
      {name === "code_start" && additional_content ? (
        <form id="blocks_for_translation">
          <React.Suspense fallback={"Cargando bloque ..."}>
            {renderBlockByName(name)}
          </React.Suspense>
          {additional_content}
        </form>
      ) : (
        <>
          <React.Suspense fallback={"Cargando bloque ..."}>
            {renderBlockByName(name)}
          </React.Suspense>
          {additional_content}
        </>
      )}

      {/* TODO: fin block separation can go here when diff block types are defined */}
    </div>
  );
};

export default Block;
