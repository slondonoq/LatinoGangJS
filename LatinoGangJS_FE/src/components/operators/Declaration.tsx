const Declaration = () => {
  return (
    <span className="block block__negation">
      <input type="text" placeholder="valor" />
      <input type="hidden" value="=" />
      {"="}
      <input type="text" placeholder="valor" />
    </span>
  );
};

export default Declaration;
