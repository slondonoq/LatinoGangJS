const AccederElemento = () => {
    return (
      <span className="block block__list">
        <input type="text" placeholder="elemento" />
        <input type="hidden" value="("/>
        {"["}
        <input type="text" placeholder="valor" />
        <input type="hidden" value=")"/>
        {"]"}
      </span>
    );
  };
  
  export default AccederElemento;
  