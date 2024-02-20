const connectToMongo = require('./db')
const express = require('express')
const port1=5001
const app=express()
app.use(express.json()); // middleware
var cors = require('cors')
//var app = express()

app.use(cors())

app.use('/api/auth/',require('./routes/auth'))

app.use('/api/notes',require('./routes/notes'))


app.listen(port1,
    () => {
        console.log(`iNotebook Backend app listening on port http://localhost:${port1}`)
      })
connectToMongo()

console.log("maza agy gya")

