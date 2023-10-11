require('dotenv').config()

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')


mongoose.connect(`mongodb+srv://backend:backend@social-media-cluster.hvtd6dw.mongodb.net/?retryWrites=true&w=majority`,

    {
        useNewUrlParser: true,
    }
    ).then(()=>{
    console.log("connected to mongodb on port 27017");
    app.use(express.json())

    const posts = [
        {
        username: 'Social',
        title: 'Post 1'
        },
        {
            username:'Media',
            title: 'Post 2'
        }
    ]
    
    app.post('/login',(req, res) => {
        
        const username = req.body.username;
        const user = {name: username};
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken: accessToken})
    })
    function authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.sendStatus(403)
    req.user = user
    next()
    })
        }
    app.listen(3001)
} 
    
    ).catch((error)=>{
        console.log(error)
    })



