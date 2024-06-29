import "@assets/stylesheets/components/Conditionals.css";

const CondIf = () => {
  return (
    <div className="block__condif--container">
      <span className="block block__condif block__sentence">
        <input type="hidden" value="si" />
        {"si"}
        <input type="text" placeholder="valor" />
      </span>
      <span className="block__condif--nested-block">
        {/* Here goes nested block */}
      </span>
      <div className="block block__condif block__condif--end block__sentence">
        <input type="hidden" value="fin" />
        {"fin"}
      </div>
    </div>
  );
}
  
  export default CondIf