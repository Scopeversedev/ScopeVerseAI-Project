import mongoose from 'mongoose';

const topMoverseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    marketcap: { type: String, required: true },
    oldmarketcap: { type: String, required: true },
    aiScore: { type: String, required: true },
    multiplier: { type: Number, required: true },
    img:{type:String,required:true},
}, { timestamps: true }); // Add timestamps

export default mongoose.model('TopMoverse', topMoverseSchema);
