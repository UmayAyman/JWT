import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const secretKey = "secretey";

app.get("/", (req, res) => {
    res.json({
        message: "a sample API"
    })
})


app.post("/login", (req, res) => {
    const user = {
        id: 1,
        username: "ani",
        email: "abc@test.com"
    }
    jwt.sign({user}, secretKey, {expiresIn: "300s"}, (err, token) => {
        res.json({
            token
        })
    })
})

app.post("/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err){
            res.send({result: "token not valid"});
        }else{
            res.json({
                message: "profile accessed",
                authData
            })
        }
    })
})

//function to verify token
function verifyToken(req, res, next) {                            //will work as a middleware
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }else {
        res.send({
            result: "Token is not valid"
        });
    }
}

app.listen(3000, () => console.log('Server running on port 3000'));