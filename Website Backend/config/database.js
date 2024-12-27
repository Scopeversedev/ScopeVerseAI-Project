import mongoose from 'mongoose';


const database = async () => {
	try{
		mongoose.set('strictQuery', false)
		await mongoose.connect(process.env.DATABASE_URL);
		console.log('database connected');
	}catch(err){
		console.log('database error', err.message);
	}
}

export default database;