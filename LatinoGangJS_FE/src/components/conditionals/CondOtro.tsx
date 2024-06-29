const CondOtro = () => {
    return (
        <div className="block__condotro--container">
          <span className="block block__condotro block__sentence">
            <input type="hidden" value=" otro " />
            {" otro "}
          </span>
          <span className="block__condotro--nested-block">
            {/* Here goes nested block */}
          </span>
          <div className="block block__condotro block__condotro--end block__sentence">
          </div>
        </div>
      );
    }
  
  export default CondOtro;