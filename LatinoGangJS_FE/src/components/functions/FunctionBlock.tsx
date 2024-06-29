const FunctionBlock = () => {
  return (
    <div className="block__function--container">
      <span className="block block__function block__sentence">
        <input type="hidden" value="funcion" />
        {"funcion"}
        <input type="text" placeholder="nombre" />
        <input type="hidden" value="("/>
        {"("}
        <input type="text" placeholder="arg(s)" />
        <input type="hidden" value=")"/>
        {")"}
      </span>
      <span className="block__function--nested-block">
        {/* Here goes nested block */}
      </span>
      <div className="block block__function block__function--end block__sentence">
        <input type="hidden" value="fin" />
        {"fin"}
      </div>
    </div>
  );
}

export default FunctionBlock