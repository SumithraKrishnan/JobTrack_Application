import { NavLink, Outlet, useNavigate } from 'react-router'
import './AppLayout.css'

function AppLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h1 className="sidebar-logo">JobTrack</h1>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/applications" end>
            Applications
          </NavLink>

          <NavLink to="/applications/new">
            Add Application
          </NavLink>
        </nav>

        <button className="logout-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout