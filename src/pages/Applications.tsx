import { Link } from 'react-router'

function Applications() {
  return (
    <div>
      <header>
        <h1>JobTrack</h1>
        <p>Manage your job applications</p>
      </header>

      <main>
        <section>
          <h2>Applications</h2>

          <Link to="/applications/new">
            <button type="button">Add Application</button>
          </Link>
        </section>

        <section>
          <p>No applications found.</p>
          <p>Add your first job application to start tracking your progress.</p>
        </section>
      </main>
    </div>
  )
}

export default Applications;