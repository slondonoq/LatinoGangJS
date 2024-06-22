import React from "react";

export interface CodeBlock {
  id?:string;
  content: React.ReactNode;
  index?:number;
}