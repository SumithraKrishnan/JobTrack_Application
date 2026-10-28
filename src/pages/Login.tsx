import { useState, type SubmitEvent } from 'react';
import { Link } from 'react-router';

function Login() {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')

const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
  e.preventDefault()
  if (!email.trim() && !password) {
  setError('Email and password are required')
  return
}
  if (!email.trim()) {
   setError('Email is required')
   return
}

 if (!password) {
 setError('Password is required')
 return
}

 if (password.length < 8) {
 setError('Password must be at least 8 characters')
 return
}

setError('')
}

return (

 <div>

 <h1>JobTrack</h1>

 <h2>Welcome Back</h2>

 <p>Sign in to manage your job applications</p>

 <form onSubmit={handleSubmit}>
 <label htmlFor="email">Email</label>

<input

 type="email"

 id="email"

 value={email}

 onChange={(e) => setEmail(e.target.value)}

 placeholder="Enter your email"

/>
<label htmlFor="password">Password</label>

<input

 type="password"

 id="password"

 value={password}

 onChange={(e) => setPassword(e.target.value)}

 placeholder="Enter your password"

/>
<button type="submit">Login</button>
</form>
{error && <p>{error}</p>}
<p>
 Don't have an account? <Link to="/register">Register</Link>
</p>


 </div>

 )

}

export default Login;