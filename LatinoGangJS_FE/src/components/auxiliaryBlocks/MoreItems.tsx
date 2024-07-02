import "@assets/stylesheets/components/AuxiliaryBlocks.css";

const MoreItems = () => {
    return (
      <span className="block block__auxiliary block--embedded">
        <input type="text" placeholder="elemento" />
        <input type="hidden" value=","/>
        {","}
        <input type="text" placeholder="elemento" />
      </span>
    );
  };
  
  export default MoreItems;
  