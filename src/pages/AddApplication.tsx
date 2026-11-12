import { useState, type ChangeEvent, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router'



type JobApplication = {
  company: string
  role: string
  location: string
  salary: string
  status: string
  appliedDate: string
  jobUrl: string
  notes: string
}

function AddApplication() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<JobApplication>({
    company: '',
    role: '',
    location: '',
    salary: '',
    status: 'Saved',
    appliedDate: '',
    jobUrl: '',
    notes: '',
  })

  const [error, setError] = useState('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()

    if (!formData.company.trim() && !formData.role.trim()) {
      setError('Company and job role are required')
      return
    }

    if (!formData.company.trim()) {
      setError('Company name is required')
      return
    }

    if (!formData.role.trim()) {
      setError('Job role is required')
      return
    }

    setError('')
    const token = localStorage.getItem('token')
    if (!token) {
      setError('You must be logged in to add an application')
      return
}
try {

 const response = await fetch('http://localhost:5000/api/applications', {

 method: 'POST',

 headers: {

 'Content-Type': 'application/json',

 Authorization: `Bearer ${token}`,

 },

 body: JSON.stringify(formData),

 })

 const data = await response.json()

 if (!response.ok) {

 setError(data.message || 'Unable to save application')

 return

 }

 setError('')

 navigate('/applications')

} catch (error) {

 console.error('Add application request failed:', error)

 setError('Unable to connect to the server')

}

  }

  return (
    <div>
      <h1>Add Application</h1>
      <p>Add a job opportunity to your tracker</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Enter company name"
        />

        <label htmlFor="role">Job Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Enter job role"
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location"
        />

        <label htmlFor="salary">Salary Range</label>
        <input
          type="text"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Example: 10-12 LPA"
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <label htmlFor="appliedDate">Applied Date</label>
        <input
          type="date"
          id="appliedDate"
          name="appliedDate"
          value={formData.appliedDate}
          onChange={handleChange}
        />

        <label htmlFor="jobUrl">Job URL</label>
        <input
          type="url"
          id="jobUrl"
          name="jobUrl"
          value={formData.jobUrl}
          onChange={handleChange}
          placeholder="https://example.com/job"
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add notes about this opportunity"
        />

        {error && <p>{error}</p>}

        <button type="submit">Save Application</button>
      </form>
    </div>
  )
}

export default AddApplication;