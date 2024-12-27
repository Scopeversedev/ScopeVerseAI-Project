import catchAsyncError from '../middlewares/catchAsyncError.js';
import UserModel from '../models/user.js'; 
import sendResponse from '../utils/sendResponse.js';
import {sendToken} from '../utils/sendToken.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';
import getDataUri from '../utils/dataUri.js';
import fs from 'fs';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))




export const register = catchAsyncError(async (req, res) => {
	const {name, email, password,role,channelName,denomination,worshipStyle,language,size,geographicLocation,specialEvent,ministryFocus,sermonSeries,dob,phone,address,organizationName, website, position, preferred_streaming_schedule, streaming_equipment, audience_size, additional_comments, organizationType} = req.body;
	console.log('body',req.body);
	const isExist = await UserModel.findOne({email});
	if(isExist) return sendResponse(false, 401, 'Email already exist',res);
	if(!name, !email, !password){
		return sendResponse(false, 401, 'All fields are required',res);
	}

	if(req.file){
		const base64 = getDataUri(req.file);
		const filename = `${new Date(Date.now()).getTime()}-${req.file.originalname}${base64.fileName}`
	    fs.writeFileSync(path.join(__dirname,`../public/upload/images/${filename}`),base64.buffer,'binary');
		req.body.avatar = `/upload/images/${filename}`;
	}else{
		req.body.avatar = `/upload/images/default.jpg`
	}
	console.log('1')
	const user = await UserModel.create({
		name: name,
		email: email,
		password: password,
		avatar: req.body.avatar,
		role: role,
		channelName: channelName,
		username: `${new Date(Date.now())}`,
		coins: 1000,
		denomination,worshipStyle,language,size,geographicLocation,specialEvent,ministryFocus,sermonSeries,
		dob,phone,address,organizationName, website, position, preferred_streaming_schedule, streaming_equipment, audience_size, additional_comments, organizationType
	});
	console.log('2')
	// await user.sendOTP();
	// res.status(200).json({
	// 	success: true,
	// 	message: "OTP send to your email"
	// })
	sendToken(res, user, "Registered Successfully", 201);
});


export const login = catchAsyncError(async (req, res, next) => {
	console.log('login')
	const {email, password} = req.body;
	if(!email || !password) return sendResponse(false, 401, 'All fields are required',res);
	let user = await UserModel.findOne({email});

	if (!user)
      return sendResponse(false, 401, 'Incorrect Email or Password',res);

	const isMatch = await user.comparePassword(password);
    if (!isMatch)
		return sendResponse(false, 401, 'Incorrect Email or Password',res);
	
	// // await user.sendOTP();
	// res.status(200).json({
	// 	success: true,
	// 	message: "OTP send to your email"
	// })
    sendToken(res, user, `Welcome back, ${user.name}`, 200);
});


export const checkOTP = catchAsyncError(async (req, res, next) => {
	console.log('login')
	const {OTP} = req.body;
	console.log(req.body)

	const user = await UserModel.findOne({OTP,OTPExpire: {$gt: Date.now()}});


	if (!user)
      return next(new ErrorHandler("OTP is invalid or has been expired", 401));
  
    user.OTP = undefined;
    user.OTPExpire = undefined;
    await user.save();
	
    sendToken(res, user, `Welcome back, ${user.name}`, 200);
});

export const loadme = catchAsyncError(async (req, res, next) => {
	console.log('loodme')
	res.status(200).json({
		success: true,
		user: req.user
	})
	console.log('uuuuu')
});

export const logout = catchAsyncError(async (req, res, next) => {
	res.clearCookie('token').status(200).json({
		success: true,
		message: 'Logout successfully'
	})
});

export const updateUser = catchAsyncError(async (req, res, next) => {
	const {name, email,channelName,file} = req.body;
	
	if(req.file){
		const base64 = getDataUri(req.file);
		const filename = `${new Date(Date.now()).getTime()}-${req.file.originalname}${base64.fileName}`
	    fs.writeFileSync(path.join(__dirname,`../public/upload/images/${filename}`),base64.buffer,'binary');
		const avatar = `/upload/images/${filename}`;
		const user = await UserModel.findByIdAndUpdate(req.user._id,{channelName,name,email,avatar});
	}
	const user = await UserModel.findByIdAndUpdate(req.user._id,{channelName,name,email});
	
	sendResponse(true,200,'Update successfully',res);
});

export const changePassword = catchAsyncError(async (req, res, next) => {
	const {oldpassword, newpassword} = req.body;
	const user = await UserModel.findById(req.user._id);
	
	const isMatch = await user.comparePassword(oldpassword);
    if (!isMatch)
		return sendResponse(false, 401, 'Incorrect old password',res);
	
	user.password = newpassword;
	await user.save();
  
    sendResponse(true,200,'Password update successfully',res);
});


// forgot password 
export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    // console.log(email)

    const user = await UserModel.findOne({ email });

    if (!user) return next(new ErrorHandler("User not found", 400));

    const resetToken = await user.getResetToken();

    await user.save();

    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;
    // Send token via email
    await sendEmail(user.email, "HG Streaming Reset Password", message);
	console.log(url);
	sendResponse(true,200,`Reset Token has been sent to ${user.email}`,res);
  });

// reset password 
export const resetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;
  
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
  
    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });
  
    if (!user)
      return next(new ErrorHandler("Token is invalid or has been expired", 401));
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
	sendResponse(true,200,"Password Changed Successfully",res);
  });


  export const followUnFollow = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
  
    const user = await UserModel.findById(id);
	
  
    if (!user)
      return next(new ErrorHandler("Invalid Channel ID", 401));
  
	const isAlreadyFollow = user.followersList?.some(userId => userId.toString() == req.user._id.toString());

	if(isAlreadyFollow){
		console.log('follow')
		user.followers -= 1;
		user.followersList = user.followersList.filter(userId => userId.toString() != req.user._id.toString());
	}else{
		user.followers += 1;
		user.followersList.push(req.user._id.toString());
	}
  
    await user.save();
	console.log(user)
	sendResponse(true,200,isAlreadyFollow ? 'Unfollow Successfully' : 'Follow Successfully',res);
  });