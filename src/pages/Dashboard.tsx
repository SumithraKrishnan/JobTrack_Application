import {Link} from 'react-router';
import {useState, useEffect} from 'react';

type JobApplication = {
  _id: string
  company: string
  role: string
  status: string
  createdAt: string
}

function Dashboard() {
    const [applications, setApplications] = useState<JobApplication[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(() => {
  const fetchApplications = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setError('Authentication required')
      setLoading(false)
      return
    }

    try {
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
        setError(data.message || 'Unable to load dashboard')
        return
      }

      setApplications(data.applications)
    } catch (error) {
      console.error('Dashboard request failed:', error)
      setError('Unable to connect to the server')
    } finally {
      setLoading(false)
    }
  }

  fetchApplications()
}, [])

const totalApplications = applications.length

const savedCount = applications.filter(
  (application) => application.status === 'Saved'
).length

const appliedCount = applications.filter(
  (application) => application.status === 'Applied'
).length

const interviewCount = applications.filter(
  (application) => application.status === 'Interview'
).length

const offerCount = applications.filter(
  (application) => application.status === 'Offer'
).length

const rejectedCount = applications.filter(
  (application) => application.status === 'Rejected'
).length

if (loading) {
  return <p>Loading dashboard...</p>
}

if (error) {
  return <p>{error}</p>
}

// for recent applications, we can slice the applications array to get the last 5 applications
const recentApplications = applications.slice(0, 5)

    return (
        <div>
            <header>
                <h1>JobTrack</h1>
                <p>Track your job applications and progress</p>
            </header>
            
            <main>
                <section>
                    <h2>Dashboard</h2>
                    <Link to="/applications/new">
                        <button type="button">Add Application</button>
                    </Link>
                </section>

                <section>
                    <div>
                        <h3>Total Applications</h3>
                        <p>{totalApplications}</p>
                    </div>
                    <div>
                        <h3>Saved</h3>
                        <p>{savedCount}</p>
                    </div>
                    <div>
                        <h3>Applied</h3>
                        <p>{appliedCount}</p>
                    </div>
                    <div>
                        <h3>Interviews</h3>
                        <p>{interviewCount}</p>
                    </div>
                    <div>
                        <h3>Offers</h3>
                        <p>{offerCount}</p>
                    </div>
                    <div>
                        <h3>Rejected</h3>
                        <p>{rejectedCount}</p>
                    </div>
                </section>

                <section>
                    <h2>Recent Applications</h2>
                    {recentApplications.length === 0 ? (
                        <p>No applications yet.</p>
                    ) : (
                        <div>
                            {recentApplications.map((application) => (
                                <div key={application._id}>
                                    <h3>{application.company}</h3>
                                    <p>{application.role}</p>
                                    <p>Status: {application.status}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

        </div>

    )

}

export default Dashboard