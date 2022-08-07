const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModels')
const auth = require('../middlewares/auth')
const Token = require('../models/token')

//Register route
router.post("/register", async (req, res) => {
    try{
        const {email, password, passwordCheck, firstname, lastname, userRole} = req.body;

        //Validate, status code 400 (bad request), 500 (internal server error)
        if(!email || !password || !passwordCheck || !firstname || !lastname){
            return res.status(400).json({ msg: "Not all fields have been entered"})
        }
        
        //checking to ensure password lenght is at least 6 characters
        if(password.length < 6){
            return res
            .status(400)
            .json({ msg: 'Password needs to be at least 6 characters long'})
        }
        
        //checking password entered vs password checker
        if (password !== passwordCheck){
            return res
            .status(400)
            .json({ msg: 'Passwords do NOT match, Please try again.'})
        }
        
        //Checking database and running an email to ensure no duplicate email upon register
        const existingEmail = await User.findOne({email: email})
        if(existingEmail){
            return res
            .status(400)
            .json({msg: 'Email already has an account, Please use another email'})
        }
        
        //using bcrypt to hash password for security
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        //creating new user noticepassword value is PasswordHash not password
        const newUser = new User({
            email: email,
            password: passwordHash,
            firstname: firstname,
            lastname: lastname,
            userRole: userRole
        })
        const savedUser = await newUser.save()
        res.json(savedUser)

        //Catching any errors that come through
    }catch (error){
        res.status(500).json({err: error.message})
    }
})

//Login route setup
let token;

router.post('/login', async (req, res) =>{
    try {
        const {email, password} = req.body

        //validate
        if(!email || !password){
            return res.status(400).json({msg: 'Not all fields has been entered'})
        }

        //checking email that was entered and comparing email in our database
        const user = await User.findOne({email: email})
        if(!user){
            return res
            .status(400)
            .json({msg: 'Invalid credentials'})
        }
        
        //checking password entered and comparing with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({msg: 'Invalid credentials'})
        }

        //Creating our json web token by passing the user id and our jwt_secret
        token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
        res.json({
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                userRole: user.userRole,
            },
        })
        //saving token in token collections
        await new Token({
                userId: user._id,
                token: token,
            }).save()
        

    }catch(error){
        res.status(500).json({ err: error.message})

    }
})

//delete user account route 
router.delete("/delete", auth, async (req, res) =>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json(deletedUser)
    }catch(error){
        res.status(500).json({err: error.message})
    }
})

//validating if user is logged in by boolean check (most useful for front end)
router.post("/tokenIsValid", async (req, res) => {
    try{
        const token = req.header('x-auth-token')
        if(!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) return res.json(false)

        const user = await User.findById(verified.id)
        if(!user) return res.json(false)

        return res.json(true)
    }catch(error){
        res.status(500).json({err: error.message})
    }
})

//route to grab one user
router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user)
    res.json({
        role: user.userRole,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user._id,
    })
})

module.exports = {router, token}
