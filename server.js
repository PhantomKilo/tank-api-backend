require('dotenv').config()
const express = require('express')
const cors = require('cors')
const tankController = require('./controllers/Tank')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
    // ⬆️ This is CORS. ❓

app.use(express.urlencoded({extended: false}))
    // ⬆️ This allows us to use the url-encoded data type on Postman. 

app.use(express.json())
    // ⬆️ This allows us to use the json data type on Postman.

app.use('/tank', tankController)

app.get('/', (req, res) => {
    res.json({
        status: 200,
        msg: 'you have hit the default route'
    })
})

app.set("port", PORT);
app.listen(app.get('port'), () => 
    console.log(`PORT: ${app.get("port")} 🌟`)
)
    // ⬆️ This is our connection to the PORT which is an environmental variable hidden in our .env file. 
