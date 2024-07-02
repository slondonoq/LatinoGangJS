const dictType = () => {
    return (
        <div className="block__dictType--container block--embedded">
          <span className="block block__dictType">
            <input type="hidden" value="{"/>
            {"{"}
          </span>
          <span className="block__dictType--nested-block">
            {/* Here goes nested block */}
          </span>
          <div className="block block__dictType block__dictType--end">
            <input type="hidden" value="}" />
            {"}"}
          </div>
        </div>
      );
    };
  
  export default dictType;