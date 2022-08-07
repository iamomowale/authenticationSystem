const router = require('express').Router()
const sendEmail = require('../middlewares/sendEmail')
const bcrypt = require('bcrypt')
const User = require('../models/userModels')
const generatedToken = require('../routes/userRouter')
const Token = require('../models/token')
const crypto = require('crypto')

router.post("/", async (req, res) => {
    try {
        const { email } = req.body
        //Validate
        if(!email){
            return res.status(400).json({msg: 'Input email to reset password'})
        }
        //Checking if email exist
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(400).json({msg: 'Invalid Email entered!'})
        }

        let token = await Token.findOne({userId: user._id})
        
        if(!token){
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            }).save()
        }

        const link = `http://localhost:5000/users/password-reset/${user._id}/${token.token}`
        await sendEmail(user.email, "Password Reset", link)

        res.send("Password reset link sent to your email account")


    } catch (error) {
        res.send("An error occured")
        console.log(error)        
    }
})


router.post("/:userId/:token", async (req, res) => {
    try {
        const { password } = req.body
        //Validate
        if(!password || password.length < 6){
            return res.status(400).json({msg: 'Password of at least 6 xters is required'})
        }

        const user = await User.findById(req.params.userId)
        if(!user) return res.status(400).send("Invalid or Expired Link")

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })

        if(!token) return res.status(400).send("Invalid or Link expired")

        //using bcrypt to hash new password for security
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(req.body.password, salt)
        
        await user.save()
        await token.delete()

        res.send("Password reset Successfully!")

    } catch (error) {
          res.send("An error has occured")
          console.log(error)    
    }
})

module.exports = router