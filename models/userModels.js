const mongoose = require('mongoose')
const Joi = require('joi')
//create Schema

const userSchema = mongoose.Schema(
    {
        //Define the properties of the application user

        firstname :{
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        userRole: {
            type: String,
            enum: ["user", "staff", "manager","admin"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

module.exports = User = mongoose.model("user", userSchema);

/*
const validate = (user) => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        userRole: Joi.string().required()       
    })
    return schema.validate(user)
}

 {User, validate} */