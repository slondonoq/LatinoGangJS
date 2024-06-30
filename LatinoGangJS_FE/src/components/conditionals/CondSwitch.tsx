const CondSwitch = () => {
    return (
      <div className="block__condswitch--container">
        <span className="block block__condswitch block__sentence">
          <input type="hidden" value="elegir" />
          {"elegir"}
          <input type="text" placeholder="valor" />
        </span>
        <span className="block__condswitch--nested-block">
          {/* Here goes nested block */}
        </span>
        <div className="block block__condswitch block__condswitch--end block__sentence">
          <input type="hidden" value="fin" />
          {"fin"}
        </div>
      </div>
    );
  }
    
    export default CondSwitch