import "@assets/stylesheets/components/Structures.css";

const Lists = () => {
  return (
      <span className="block block__list ">
        <input type="text" placeholder="variable"/>
        <input type="hidden" value="= [" />
        {"= ["}
        <input type="text" placeholder="element(s)" />
        <input type="hidden" value="]"/>
        {"]"}
      </span>
    
  );
};

export default Lists;
