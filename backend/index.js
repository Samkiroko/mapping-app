const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/users')
const pinRoute = require('./routes/pins')

dotenv.config()

const PORT = process.env.PORT || 8800

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log(err))

app.use('/api/users', userRoute)
app.use('/api/pins', pinRoute)

app.listen(PORT, () => {
  console.log('Backend server is running!')
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'))
}
