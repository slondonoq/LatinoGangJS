import '@assets/stylesheets/layout/Playground.css'
import logo_no_bg from '@assets/img/logo_no_background.png'

const Playground = () => {
  // TODO: implement layout section
  return(
    <section id="playground">
      <img src={logo_no_bg} id='watermark'/>
      <p>Block stacking editor goes here</p>
    </section>
  )
}

export default Playground