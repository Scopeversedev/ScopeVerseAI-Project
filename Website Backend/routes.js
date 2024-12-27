import express from 'express';
import {changePassword, loadme, login, logout, register, updateUser,forgotPassword,resetPassword, checkOTP, followUnFollow} from './controllers/user.js';
import { isAuthenticate, isCheckRole } from './middlewares/auth.js';
import singleUpload from './middlewares/multer.js';
import { bundleDetails, checkWhalesWallet, tokenOverview } from './controllers/tokenApis.js';
import whalesWallet from './models/whalesWallet.js';
import { addAnalysisCoin, RecentAnalysisCoin } from './controllers/analysisController.js';
import { FeedBackSubmit,FeedBacks } from './controllers/FeedBack.js';
import { fetchTopMovers } from './controllers/topMoverseController.js'; // Assuming fetchTopMovers function is in the services directory
import catchAsyncError from './middlewares/catchAsyncError.js';// If you have a utility for async error handling
import { getTopMovers } from './controllers/topMoverseController.js';
const router = express.Router();

// users routes
router.route('/register').post(singleUpload, register);
router.route('/login').post(login);
router.route('/me').get(isAuthenticate,loadme);
router.route('/logout').get(logout);
router.route('/user/update').put(isAuthenticate,singleUpload,updateUser);
router.route('/user/change-password').put(isAuthenticate,changePassword);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:token').put(resetPassword);


// 

router.route('/token-details').post(tokenOverview)
router.route("/bundle-check").post(bundleDetails)
router.route("/smart-money").post(checkWhalesWallet)


// recent analysis routes.

router.route("/recent-analysis").get(RecentAnalysisCoin).post(addAnalysisCoin)

router.route("/feedback").get(FeedBacks).post(FeedBackSubmit)

// Route to fetch and update Top Movers


// Route to fetch all top movers
router.get('/top-movers', getTopMovers);


export default router;