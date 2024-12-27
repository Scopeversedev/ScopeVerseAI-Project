import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

function getAvatar(avatar){
	if(avatar){
		return `${process.env.BACKEND_URL}/upload/images/${avatar}`
	}
	return avatar;
}

function generateOTP() {
	// Generate a random 6-digit number
	const otp = Math.floor(100000 + Math.random() * 900000);
	return otp.toString(); // Convert to string
}

const schema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true,unique: true},
	password: {type: String, required: true, selected: false},
	resetPasswordToken: {type: String, default: undefined},
	resetPasswordExpire: {type: String, default: undefined},
	avatar: {type: String,default: undefined,get: getAvatar},
	role: {type: String,default: 'viewer'},
	channelName: {type: String,default: undefined},
	username: {type: String,default: undefined,unique: false},
	coins: {type: Number,default: 0, unique: false},
	denomination: {type: String,default: undefined},
	worshipStyle: {type: String,default: undefined},
	language: {type: String,default: undefined},
	size: {type: String,default: undefined},
	geographicLocation: {type: String,default: undefined},
	specialEvent: {type: String,default: undefined},
	ministryFocus: {type: String,default: undefined},
	sermonSeries: {type: String,default: undefined},

	dob: {type: String,default: undefined},
	phone: {type: String,default: undefined},
	address: {type: String,default: undefined},
	organizationName: {type: String,default: undefined},
	website: {type: String,default: undefined},
	position: {type: String,default: undefined},
	preferred_streaming_schedule: {type: String,default: undefined},
	audience_size: {type: String,default: undefined},
	streaming_equipment: {type: String,default: undefined},
	additional_comments: {type: String,default: undefined},
	organizationType: {type: String,default: undefined},
	OTP: {type: String,default: undefined},
	OTPExpire: {type: Number, default: undefined},
	followers: {type: Number, default: 0},
	followersList: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
},{timestamps: true});

schema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
  });
  
  schema.methods.getJWTToken = function () {
	return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
	  expiresIn: "15d",
	});
  };
  
  schema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
  };

  schema.methods.sendOTP = async function () {
	
	
	// Example usage:
	const otp = generateOTP();
	console.log("Generated OTP:", otp);
	this.OTP = otp;
	this.OTPExpire = Date.now() + 5 * 60 * 1000;
	await sendEmail(this.email, "HG Vibe Streaming OTP", otp)
	this.save();
	return otp;
  };
  
  schema.methods.getResetToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");
  
	this.resetPasswordToken = crypto
	  .createHash("sha256")
	  .update(resetToken)
	  .digest("hex");
  
	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
	return resetToken;
  };

export default mongoose.model('user', schema);