export interface CodeBlock {
  id?:string;
  content: JSX.Element;
  index?:number;
  delFunction?: Function;
  replaceFunction?: Function;
}

export interface PlaceholderBlock {
  isReduced?: boolean,
  placeholderText?: string,
  defaultContent?: JSX.Element,
  onDrop?: Function
}

export interface Sentence_rel {
  sent_parent?: string,
  sent_child?: string
}

export interface Data {
  rootElems: string[],
  sentence_relations: {[id: string] : Sentence_rel }
}

export interface ElementsData {
  [id: string] : JSX.Element
}