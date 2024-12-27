
export const app = express();
import dotenv from 'dotenv';
import routes from './routes.js';
import database from './config/database.js';
import errorMiddleware from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path, {join,resolve,dirname} from 'path';
import {fileURLToPath} from 'url';
import express from 'express'
import cron from 'node-cron';


const __dirname = dirname(fileURLToPath(import.meta.url))
// .env
dotenv.config({path: './config/.env'});

//body parser
app.use(express.json());
app.use(
	express.urlencoded({
		
	    extended: true,
	})
);
app.use('',express.static(join(__dirname,'/public')));

// cookie parser 
app.use(cookieParser());

// cors 
app.use(cors({
	origin: process.env.FRONTEND_URL,
	methods: ['GET','POST','PUT','DELETE'],
	credentials: true
}));


// connnect database
database();

// app routes
app.use('/api/v1',routes);


// Middleware for Errors
app.use(errorMiddleware);
