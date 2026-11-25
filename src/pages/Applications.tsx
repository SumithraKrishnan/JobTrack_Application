import {useState, useEffect} from 'react'
import { Link } from 'react-router'

type JobApplication = {
  _id: string
  company: string
  role: string
  location: string
  salary: string
  status: string
  appliedDate?: string
  jobUrl: string
  notes: string
  createdAt: string
}
function Applications() {
const [applications, setApplications] = useState<JobApplication[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [searchTerm, setSearchTerm] = useState('')
const [statusFilter, setStatusFilter] = useState('All')
const [sortBy, setSortBy] = useState('newest')

// Fetch applications from the server when the component mounts
useEffect(() => {
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        setError('You must be logged in to view applications')
        setLoading(false)
        return
      }

      const response = await fetch(
        'http://localhost:5000/api/applications',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Unable to load applications')
        return
      }

      setApplications(data.applications)
    } catch (error) {
      console.error('Fetch applications failed:', error)
      setError('Unable to connect to the server')
    } finally {
      setLoading(false)
    }
  }

  fetchApplications()
}, [])

// Handle delete application
const handleDelete = async (applicationId: string) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this application?'
  )

  if (!confirmed) {
    return
  }

  const token = localStorage.getItem('token')

  if (!token) {
    setError('You must be logged in to delete an application')
    return
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/applications/${applicationId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      setError(data.message || 'Unable to delete application')
      return
    }

    setApplications((previousApplications) =>
      previousApplications.filter(
        (application) => application._id !== applicationId
      )
    )

    setError('')
  } catch (error) {
    console.error('Delete application failed:', error)
    setError('Unable to connect to the server')
  }
}

// for search and filter functionality
const filteredApplications = applications.filter((application) => {
  const search = searchTerm.toLowerCase().trim()

  const matchesSearch =
    application.company.toLowerCase().includes(search) ||
    application.role.toLowerCase().includes(search)

  const matchesStatus =
    statusFilter === 'All' ||
    application.status === statusFilter

  return matchesSearch && matchesStatus
})

// for sorting functionality
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
    if (sortBy === 'az') {
      return a.company.localeCompare(b.company)
    }
    if (sortBy === 'za') {
      return b.company.localeCompare(a.company)
    }
    return 0
  })


  return (
    <div>
      <header>
        <h1>JobTrack</h1>
        <p>Manage your job applications</p>
      </header>
      <label htmlFor="search">Search</label>

      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by company or role"
      />
      <label htmlFor="statusFilter">Status</label>

      <select
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Saved">Saved</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <label htmlFor="sortBy">Sort By</label>

      <select

        id="sortBy"

        value={sortBy}

        onChange={(e) => setSortBy(e.target.value)}

      >

        <option value="newest">Newest First</option>

        <option value="oldest">Oldest First</option>

        <option value="az">Company A-Z</option>

        <option value="za">Company Z-A</option>

      </select>

      <main>
        <section>
          <h2>Applications</h2>

          <Link to="/applications/new">
            <button type="button">Add Application</button>
          </Link>
        </section>

        <section>
          {loading && <p>Loading applications...</p>}

{error && <p>{error}</p>}

{!loading && !error && applications.length === 0 && (
  <div>
    <p>No applications found.</p>
    <p>Add your first job application to start tracking your progress.</p>
  </div>
)}

{!loading &&
  !error &&
  applications.length > 0 &&
  filteredApplications.length === 0 && (
    <p>No applications match your search or filter.</p>
  )}

{!loading && !error && filteredApplications.length > 0 && (
  <div>
    {sortedApplications.map((application) => (
      <div key={application._id}>
        <h3>{application.company}</h3>

        <p>{application.role}</p>

        {application.location && (
          <p>Location: {application.location}</p>
        )}

        {application.salary && (
          <p>Salary: {application.salary}</p>
        )}

        <p>Status: {application.status}</p>

        {application.appliedDate && (
          <p>
            Applied Date:{' '}
            {new Date(application.appliedDate).toLocaleDateString()}
          </p>
        )}

        {application.notes && (
          <p>Notes: {application.notes}</p>
        )}
        <button type="button" onClick={() => handleDelete(application._id)}>Delete</button>
        <Link to={`/applications/${application._id}/edit`}>
           <button type="button">Edit</button>
        </Link>
      </div>
    ))}
  </div>
)}
        </section>
      </main>
    </div>
  )
}

export default Applications;