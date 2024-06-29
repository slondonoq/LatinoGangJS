const Dictionaries = () => {
  return (
    <div className="block__dic--container">
      <span className="block block__dic block__sentence">
        <input type="text" placeholder="variable"/>
        <input type="hidden" value="= {"/>
        {"= {"}
      </span>
      <span className="block__dic--nested-block">
        {/* Here goes nested block */}
      </span>
      <div className="block block__dic block__dic--end block__sentence">
        <input type="hidden" value="}" />
        {"}"}
      </div>
    </div>
  );
};

export default Dictionaries;
