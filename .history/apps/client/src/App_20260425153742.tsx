import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import CreateWorkflow from './components/CreateWorkflow'
import Auth from './components/pages/Auth'
import Dashboard from './components/pages/Dashboard'
import WorkflowDetail from './components/pages/WorkflowDetail'
import WorkflowExecutions from './components/pages/WorkflowExecutions'

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route />
        <Route path='/create-workflow' element={<CreateWorkflow/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workflow/:workflowId" element={<WorkflowDetail />} />
        <Route path="/workflow/:workflowId/executions" element={<WorkflowExecutions />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
