import { FC } from 'react'

export interface CodeBlock extends CodeBlockWithNestingAndEmbeddings{
  id?:string,
  additional_content?: JSX.Element,
  index?:number,
  name: string,
  blockTypes: string[]
  variableName?: string,
}

export interface PlaceholderBlock {
  isReduced?: boolean,
  placeholderText?: string,
  defaultContent?: JSX.Element,
  onDrop: Function
  itemsTypes?: string[],
  embedding_spot?: string
}

export interface CodeBlockWithEmbeddings {
  embeddedBlock1?: JSX.Element,
  embeddedBlock2?: JSX.Element,
  embeddedBlock3?: JSX.Element,
  embeddedOnDrop?: Function,
  handleInputs?: Function,
  inputs?:string[],
  isSentence?: boolean
}

export interface CodeBlockWithNesting {
  nestedBlock?: JSX.Element,
  nestedOnDrop?: Function,
}

export interface CodeBlockWithNestingAndEmbeddings extends CodeBlockWithEmbeddings {
  nestedBlock?: JSX.Element,
  nestedOnDrop?: Function,
}

export interface Sentence_rel {
  sent_parent?: string,
  sent_child?: string
}

export interface Embedding_rel {
  emb_parent?: string,
  emb_child_1?: string
  emb_child_2?: string
  emb_child_3?: string
}

export interface Nested_rel {
  nested_parent?: string,
  nested_child?: string
}

export interface Data {
  rootElems: string[],
  sentence_relations: {[id: string] : Sentence_rel },
  embedded_relations: {[id: string] : Embedding_rel},
  nested_relations: {[id: string] : Nested_rel},
  has_translation_block: boolean,
  inputs: {[id:string] : string[]},
}

export interface ElementsData {
  [id: string] : CodeBlock
}

export interface BlockComponents {
  [id: string] : FC<CodeBlockWithEmbeddings>
}
