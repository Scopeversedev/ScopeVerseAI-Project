import mongoose from 'mongoose';


const schema = new mongoose.Schema({
	name: {type: String, required: true},
    symbol:{type:String,required:true},
    address:{type:String,required:true},
    img:{type:String,required:true},
    marketcap:{type:String,required:true},
    change24hr:{type:Number,required:true},
	description: {type: String, required: false},
    aiScore:{type:String,required:true},
    price: { type: Number, required: true },
    
},{timestamps: true});



export default mongoose.model('recentanalysis', schema);