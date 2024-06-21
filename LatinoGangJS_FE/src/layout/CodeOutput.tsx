import SyntaxHighlighter from "react-syntax-highlighter";
import {
  tomorrow,
  dracula,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState } from "react";
import MoonIcon from "../assets/icons/moon.svg";
import SunIcon from "../assets/icons/sun.svg";
import PlayIcon from "../assets/icons/play.svg";
import CopyIcon from "../assets/icons/copy.svg";
import CheckIcon from "../assets/icons/check.svg";
import "@assets/stylesheets/layout/CodeOutput.css";

const codeJs = `
  function fibonacci(num) {
    let num1 = 0;
    let num2 = 1;
    let sum;
    if (num === 1) {
        return num1;
    } else if (num === 2) {
        return num2;
    } else {
        for (let i = 3; i <= num; i++) {
            sum = num1 + num2;
            num1 = num2;
            num2 = sum;
        }
        return num2;
    }
}

console.log("Fibonacci(5): " + fibonacci(5));
console.log("Fibonacci(8): " + fibonacci(8));
console.log("Fibonacci(12): " + fibonacci(12));
  `;
const CodeOutput = () => {
  // TODO: implement layout section
  const [isLight, setIsLight] = useState(true);
  const [copy, setCopy] = useState(false);

  const isCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLight(!e.target.checked);
    console.log(!e.target.checked);
  };
  return (
    <section id="code-output">
      {/* <button id="play-btn">
        Run
        <img src={PlayIcon} alt="" />
      </button> */}
      
      <div id="code-header">
        <div>
          <input type="checkbox" id="darkmode-toggle" onChange={isCheck} />
          <label htmlFor="darkmode-toggle">
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
    </section>
  );
};

export default CodeOutput;
