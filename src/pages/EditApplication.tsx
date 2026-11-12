import {useEffect, useState,type ChangeEvent,type SubmitEvent} from 'react'
import {useNavigate,useParams} from 'react-router'

type JobApplicationForm = {
  company: string
  role: string
  location: string
  salary: string
  status: string
  appliedDate: string
  jobUrl: string
  notes: string
}

function EditApplication() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] =
    useState<JobApplicationForm>({
      company: '',
      role: '',
      location: '',
      salary: '',
      status: 'Saved',
      appliedDate: '',
      jobUrl: '',
      notes: '',
    })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
  const fetchApplication = async () => {
    if (!id) {
      setError('Application ID is missing')
      setLoading(false)
      return
    }

    const token = localStorage.getItem('token')

    if (!token) {
      setError('You must be logged in')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/applications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Unable to load application')
        return
      }

      const application = data.application

      setFormData({
        company: application.company ?? '',
        role: application.role ?? '',
        location: application.location ?? '',
        salary: application.salary ?? '',
        status: application.status ?? 'Saved',
        appliedDate: application.appliedDate
          ? application.appliedDate.split('T')[0]
          : '',
        jobUrl: application.jobUrl ?? '',
        notes: application.notes ?? '',
      })
    } catch (error) {
      console.error('Fetch application failed:', error)
      setError('Unable to connect to the server')
    } finally {
      setLoading(false)
    }
  }

  fetchApplication()
}, [id])

const handleChange = (
  e: ChangeEvent<
    HTMLInputElement |
    HTMLSelectElement |
    HTMLTextAreaElement
  >
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

  if (!id) {
    setError('Application ID is missing')
    return
  }

  const token = localStorage.getItem('token')

  if (!token) {
    setError('You must be logged in')
    return
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/applications/${id}`,
      {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      setError(data.message || 'Unable to update application')
      return
    }

    setError('')
    navigate('/applications')
  } catch (error) {
    console.error('Update application failed:', error)
    setError('Unable to connect to the server')
  }
}

if (loading) {
  return <p>Loading application...</p>
}
return (
  <div>
    <h1>Edit Application</h1>

    <form onSubmit={handleSubmit}>
      <label htmlFor="company">Company</label>
      <input
        id="company"
        name="company"
        type="text"
        value={formData.company}
        onChange={handleChange}
      />

      <label htmlFor="role">Job Role</label>
      <input
        id="role"
        name="role"
        type="text"
        value={formData.role}
        onChange={handleChange}
      />

      <label htmlFor="location">Location</label>
      <input
        id="location"
        name="location"
        type="text"
        value={formData.location}
        onChange={handleChange}
      />

      <label htmlFor="salary">Salary Range</label>
      <input
        id="salary"
        name="salary"
        type="text"
        value={formData.salary}
        onChange={handleChange}
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
        id="appliedDate"
        name="appliedDate"
        type="date"
        value={formData.appliedDate}
        onChange={handleChange}
      />

      <label htmlFor="jobUrl">Job URL</label>
      <input
        id="jobUrl"
        name="jobUrl"
        type="url"
        value={formData.jobUrl}
        onChange={handleChange}
      />

      <label htmlFor="notes">Notes</label>
      <textarea
        id="notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
      />

      {error && <p>{error}</p>}

      <button type="submit">
        Update Application
      </button>
    </form>
  </div>
)
}

export default EditApplication
