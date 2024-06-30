const CondElseIf = () => {
    return (
        <div className="block__condelseif--container">
          <span className="block block__condelseif block__sentence">
            <input type="hidden" value="osi" />
            {"osi"}
            <input type="text" placeholder="valor" />
          </span>
          <span className="block__condelseif--nested-block">
            {/* Here goes nested block */}
          </span>
          <div className="block block__condelseif block__condelseif--end block__sentence">
          </div>
        </div>
      );
    }
  
  export default CondElseIf;