import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import CreateWorkflow from './components/CreateWorkflow'

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/create-workflow' element={<CreateWorkflow/>} />
        <Route path="/auth" element={Au} />
        <Route path="/dashboard" element={} />
        <Route path="/workflow/:workflowId" element={} />
        <Route path="/workflow/:workflowId/executions" element={} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
