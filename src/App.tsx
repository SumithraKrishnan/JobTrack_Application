
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddApplication from './pages/AddApplication'
import Applications from './pages/Applications'

function App() {
  

  return (
    <>
      <h1>Job Tracker</h1>
      <h3>Job Application Tracker</h3>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/applications/new" element={<AddApplication />}/>
        <Route path="/applications" element={<Applications />}/>
      </Routes>
     
    </>
  )
}

export default App
