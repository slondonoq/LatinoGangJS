import "@assets/stylesheets/components/Functions.css";

const ReturnBlock = () => {
  return (
    <div className="block__function--container">
      <span className="block block__function block__sentence">
        <input type="hidden" value="retornar" />
        {"retornar"}
      </span>
      <span className="block__function--nested-block">
        {/* Here goes nested block */}
      </span>
      <div className="block block__function block__function--end block__sentence">
      </div>
    </div>
  );
};

export default ReturnBlock;
