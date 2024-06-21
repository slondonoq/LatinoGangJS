import "@assets/stylesheets/layout/Playground.css";
import logo_no_bg from "@assets/img/logo_no_background.png";
import PlayIcon from "@assets/icons/play.svg";
import ClearIcon from "@assets/icons/clear.svg";

const Playground = () => {
  // TODO: implement layout section
  return (
    <section id="playground">
      <div id="section-header">
        <button className="btn-section clean">
          Clear
          <img src={ClearIcon} alt="" />
        </button>
        <button className="btn-section play">
          Run
          <img src={PlayIcon} alt="" />
        </button>
      </div>
      <img src={logo_no_bg} id="watermark" />
      <p>Block stacking editor goes here</p>
    </section>
  );
};

export default Playground;
