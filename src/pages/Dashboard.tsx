import {Link, useNavigate} from 'react-router';

function Dashboard() {
    const navigate = useNavigate();

    // logout functionality
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div>
            <header>
                <h1>JobTrack</h1>
                <p>Track your job applications and progress</p>
            </header>
            <button onClick={handleLogout}>Logout</button>
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
                        <p>0</p>
                    </div>
                    <div>
                        <h3>Saved</h3>
                        <p>0</p>
                    </div>
                    <div>
                        <h3>Applied</h3>
                        <p>0</p>
                    </div>
                    <div>
                        <h3>Interviews</h3>
                        <p>0</p>
                    </div>
                    <div>
                        <h3>Offers</h3>
                        <p>0</p>
                    </div>
                    <div>
                        <h3>Rejected</h3>
                        <p>0</p>
                    </div>
                </section>

                <section>
                    <h2>Recent Applications</h2>
                    <p>No applications yet.</p>
                </section>
            </main>

        </div>

    )

}

export default Dashboard