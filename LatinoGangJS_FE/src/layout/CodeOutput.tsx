import SyntaxHighlighter from "react-syntax-highlighter";
import {
  tomorrow,
  dracula,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import React, { useState } from "react";
import MoonIcon from "@assets/icons/moon.svg";
import SunIcon from "@assets/icons/sun.svg";
import CopyIcon from "@assets/icons/copy.svg";
import CheckIcon from "@assets/icons/check.svg";
import "@assets/stylesheets/layout/CodeOutput.css";

interface CodeOutputInterface {
  codeLatino:string,
  codeJs:string,
}
const CodeOutput :React.FC<CodeOutputInterface>= ({codeLatino,codeJs}) => {
  // TODO: implement layout section
  const [isLight, setIsLight] = useState(true);
  const [copy, setCopy] = useState(false);

  const isCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLight(!e.target.checked);
    console.log(!e.target.checked);
  };
  return (
    <section id="code-output">
      <div id="section-header">
        <div>
          <input type="checkbox" id="darkmode-toggle" onChange={isCheck} />
          <label className="labelOutput" htmlFor="darkmode-toggle">
            <img src={SunIcon} alt="Sun Icon" className="sun" />
            <img src={MoonIcon} alt="Moon Icon" className="moon" />
          </label>
        </div>
        
        {copy ? (
          <button className="copy-btn" >
            <img src={CheckIcon} alt="" />
            <span>Copied!</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setCopy(true);
              navigator.clipboard.writeText(codeJs);
              setTimeout(() => {
                setCopy(false);
              }, 2000);
            }}
            className="copy-btn"
          >
            <img src={CopyIcon} alt="" />
            <span>Copy code</span>
          </button>
        )}
      </div>
      <div className="output-header">JavaScript Code</div>
      <SyntaxHighlighter
        language="javascript"
        style={isLight ? tomorrow : dracula}
        showLineNumbers={true}
        customStyle={{
          padding: "0px",
        }}
      >
        {codeJs}
      </SyntaxHighlighter>
      <div className="output-header">Latino Code</div>
      <SyntaxHighlighter
        language="plaintext"
        style={isLight ? tomorrow : dracula}
        showLineNumbers={true}
        customStyle={{
          padding: "10px",
          
        }}
      >
        {codeLatino}
      </SyntaxHighlighter>
    </section>
  );
};

export default CodeOutput;