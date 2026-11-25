
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddApplication from './pages/AddApplication'
import Applications from './pages/Applications'
import ProtectedRoute from './components/ProtectedRoute'
import EditApplication from './pages/EditApplication'
import AppLayout from './components/AppLayout'

function App() {
  

  return (
    <>
      <h1>Job Tracker</h1>
      <h3>Job Application Tracker</h3>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        // Protected routes
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route
              path="/applications"
              element={<Applications />}
            />

            <Route
              path="/applications/new"
              element={<AddApplication />}
            />

            <Route
              path="/applications/:id/edit"
              element={<EditApplication />}
            />
          </Route>
        </Route>
      </Routes>
     
    </>
  )
}

export default App
