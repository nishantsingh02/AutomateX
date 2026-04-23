import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import CreateWorkflow from './components/CreateWorkflow'
import Auth from './components/pages/Auth'
import Dashboard from './components/pages/Dashboard'

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/create-workflow' element={<CreateWorkflow/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workflow/:workflowId" element={<W />} />
        <Route path="/workflow/:workflowId/executions" element={} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
