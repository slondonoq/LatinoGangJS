import '@assets/stylesheets/App.css'
import BlockStackingEditor from '@layout/BlockStackingEditor'
import CodeBlockSelection from '@layout/CodeBlocksSelection'
import CodeOutput from '@layout/CodeOutput'

function App() {


  return (
    <>
      <CodeBlockSelection />
      <BlockStackingEditor />
      <CodeOutput />
    </>
  )
}

export default App
