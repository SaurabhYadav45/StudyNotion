const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth

exports.auth = async(req, res, next) =>{
    try {
        // extract token
        const token = req.cookies.token
                        || req.body.token
                        || req.header("Authorisation").replace("Bearer ", "");

        // If token missing, then return response
        if(!token){
            return res.status(401).json({
                success: false,
                message:"Token is missing",
            })
       }

    // Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (err) {
            //Verification Issue
            return res.status(401).json({
                success:false,
                message:'Token is Invalid',
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong, while validating the token"
        })
    }
}


// isStudent

exports.isStudent = async(req, res, next) =>{
    try {
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message:"This is a protected route for only Students"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again"
        })
    }
}

// isAdmin
exports.isAdmin = async(req, res, next) =>{
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message:"This is a protected route for only Admins"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Admin role cannot be verified, please try again"
        })
    }
}