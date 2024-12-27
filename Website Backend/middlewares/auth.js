import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import UserModel from '../models/user.js'; 

export const isAuthenticate = async (req,res,next) => {
    try{
        const token = req.cookies.token;

        if(!token) throw new ErrorHandler('Unauthorize user',401);
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findById(decodeToken._id);
        
        if(!user) throw new ErrorHandler('Unauthorize user',401);
       
        req.user = user;

        next()
       

    }catch(err){
    
        res.status(err.statusCode || 501).json({
            success: false,
            message: err.message
        })
    }
}


export const isCheckRole = (role) => async (req,res,next) => {
    try{
        if(req.user.role != role){
            throw new ErrorHandler(`Only ${role} can do this opretion`,401);
        }

        next()
       

    }catch(err){
    
        res.status(err.statusCode || 501).json({
            success: false,
            message: err.message
        })
    }
}