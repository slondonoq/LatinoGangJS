import '@assets/stylesheets/App.css'
import '@assets/stylesheets/components/CodeBlocks.css'
import Playground from '@layout/Playground'
import CodeBlockSelection from '@layout/CodeBlocksSelection'
import CodeOutput from '@layout/CodeOutput'
import TopBar from '@layout/TopBar'

function App() {


  return (
    <>
      <TopBar />
      <CodeBlockSelection />
      <Playground />
      <CodeOutput />
    </>
  )
}

export default App
