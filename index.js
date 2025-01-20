const express = require('express');
const app = express();

app.use(express.json());

const users = []
const generateToken = () => {
    return Math.random();

}
app.get('/', (req, res)=>{
    res.send(`Hello...`)
})

app.post('/signup', (req, res)=>{
    const username =  req.body.username;
    const password = req.body.password;
    users.push({
        username:username,
        password:password
    })
    res.json({
        msg: `signup`
    })
})

app.post('/signin', (req, res)=> {
    const username = req.body.username;
    const password  = req.body.password
    const currUser = users.find((user)=>{
        if(user.username == username && user.password == password){
            return true;
        }else{
            return false;
        }
    })
    if(currUser){
        const token  = generateToken();
        currUser.token = token;
        console.log(users);
        res.json({
            msg: token
        })
    }else{
        res.status(403).json({
            msg: `Invalid credentials`
        })
    }
})

app.get('/me', (req, res)=>{
    const token = req.headers.token;
    const userMe =  users.find((u)=>{
        if(u.token == token){
            return true;
        }else{
            return false
        }
    })

    if(userMe){
        res.status(200).json({
            info: userMe
        })
    }else{
        res.json({
            msg: `user are not the authorized one`
        })
    }
})

app.listen(3000, ()=> {
    console.log(`Server is listening on port : 3000...`)
});