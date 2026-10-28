import express from 'express'

const app = express()
const PORT = 5000

app.use(express.json())

app.get('/api', (req, res) => {
  res.json({
    message: 'JobTrack API is running',
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})