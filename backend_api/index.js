const connectToMongo = require('./db')
const express = require('express')
const port=3000
const app=express()

//available Routes
app.get('/api/auth',require('./routes/auth'))
//app.get('/api/notes',require('./routes/notes'))


app.listen(port,
    () => {
        console.log(`Example app listening on port http://localhost:${port}`)
      })
connectToMongo()

console.log("maza agy gya bad me")

