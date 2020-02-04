const express = require('express')
var cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 3001
const connectionString = process.env.DB_CONECTION

// MIDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Import Routes
const specialtiesRoute = require('./routes/specialties')
const providersRoute = require('./routes/providers')

app.use('/specialties', specialtiesRoute)
app.use('/providers', providersRoute)

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('Cotennected to DB')
)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
