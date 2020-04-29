const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res) => {
    res.json({
        message : "Welcome to the API"
    });
});

app.post('/api/post', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey', (err,user) => {
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message : "Post Created",
                user
            });
        }
    })

});

app.post('/api/login', (req,res) => {
    // Moch User
    const user = {
        id : 1,
        username : 'malathy',
        email : 'malu@gmial.com'
    }

    jwt.sign({user : user}, 'secretkey',{expiresIn: '30s'}, (err,token) => {
        res.json({
            token : token
        })
    });
})

// Format of Token
// Authorization : Bearer <access_token>

// Verify Token
function verifyToken(req, res, next){
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        // split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        // res.send({
        //     tokensss: bearerToken
        // })
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(5000, ()=>{
    console.log('Server started on port 5000');
    
})
