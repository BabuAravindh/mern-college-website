const express = require('express')
const app = express()
const college = require('./routes/college')
const auth = require('./routes/auth')
const connectDB = require('./db/db')
const dotenv = require('dotenv')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
dotenv.config()

app.use(cors())
app.use(express.json())
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

app.use(cors({
    origin: 'http://localhost:5173', // or '*', but more secure to specify origin
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Enable credentials if needed
  }));


app.use('/api/v1',college)
app.use('/api/v1/auth',auth)
port = 5000
mongoose.connect(process.env.MONGO_URI)
app.listen(port,() => {
    console.log(`server is listening on ${port}.....`)
})
  