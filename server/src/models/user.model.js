import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema({
    username : {
        type : String,
        required : [true, "Name is required"],
        unique : [true, "Name already exists"],
        trim : true,
        lowercase : true
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        trim : true,
        lowercase : true,
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please fill in a valid email address"
        ]
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minLength : [8, "Password must be of atleast 8 characters"],
        select : false
    },
    refreshToken : {
        type : String,
        select : false,
    },
    forgotPasswordToken : String,
    forgotPasswordExpiry : Date,
}, {
    timestamps : true
})

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
    next();
})

userSchema.methods = {
    generateAccessToken : function(){
        return jwt.sign(
            {
                _id : this._id,
                email : this.email,
                username : this.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    },
    generateRefreshToken : function(){
        return jwt.sign(
            {
                _id : this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn : process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    },

    isPasswordCorrect : async function (password) {
        if(!password || typeof password !== 'string'){
            throw new Error("Password must be a string");
        }

        return await bcryptjs.compare(password, this.password);
    },
}

export const User = mongoose.model("User", userSchema);
