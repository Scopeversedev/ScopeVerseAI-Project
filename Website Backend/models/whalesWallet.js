import mongoose from 'mongoose';
import user from './user.js';


const schema = new mongoose.Schema({
	wallet: {type:String, required:true},
   
},{timestamps: true});



export default mongoose.model('WhalesWallet', schema);