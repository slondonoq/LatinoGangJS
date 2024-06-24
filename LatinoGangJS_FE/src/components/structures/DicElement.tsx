const DicElement = () => {
  return (
    <span className="block block__dic block__sentence">
      <input type="text" placeholder="clave" />
      <input type="hidden" value=": " />
      {": "}
      <input type="text" placeholder="valor" />
      <input type="hidden" value=", " />
      {", "}
    </span>
  );
};

export default DicElement;
