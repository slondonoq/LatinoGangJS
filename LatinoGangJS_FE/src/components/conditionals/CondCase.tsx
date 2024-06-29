const CondCase = () => {
    return (
        <div className="block__condcase--container">
          <span className="block block__condcase block__sentence">
            <input type="hidden" value="caso" />
            {"caso"}
            <input type="text" placeholder="valor" />
            <input type="hidden" value=": " />
            {": "}
          </span>
          <span className="block__condcase--nested-block">
            {/* Here goes nested block */}
          </span>
          <div className="block block__condcase block__condcase--end block__sentence">
          </div>
        </div>
      );
    }
  
  export default CondCase;