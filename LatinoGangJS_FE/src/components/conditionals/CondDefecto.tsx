const CondDefecto = () => {
    return (
        <div className="block__conddefecto--container">
          <span className="block block__conddefecto block__sentence">
            <input type="hidden" value=" defecto " />
            {" defecto "}
          </span>
          <span className="block__conddefecto--nested-block">
            {/* Here goes nested block */}
          </span>
          <div className="block block__conddefecto block__conddefecto--end block__sentence">
          </div>
        </div>
      );
    }
  
  export default CondDefecto;