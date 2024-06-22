const FunCall = () => {
  return (
    <span className="block block__function ">
      <input type="text" placeholder="funcion" />
      <input type="hidden" value="("/>
      {"("}
      <input type="text" placeholder="arg(s)" />
      <input type="hidden" value=")"/>
      {")"}
    </span>
  );
};

export default FunCall;
