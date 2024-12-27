import catchAsyncError from '../middlewares/catchAsyncError.js';
import RecentAnalysis from '../models/RecentAnalysis.js';
import axios from 'axios';

export const addAnalysisCoin = catchAsyncError(async (req, res) => {
    try {
        const { address } = req.body;
        const details = req.body;
        console.log(details)

        console.log("Received details:", details);

        // Check if the address already exists in the database
        const existingRecord = await RecentAnalysis.findOne({ address });

        let result;
        if (existingRecord) {
            // If the address exists, update the record
            console.log("Updating existing record...");
            result = await RecentAnalysis.findOneAndUpdate(
                { address },
                { $set: details },
                { new: true } // Return the updated document
            );
        } else {
            // If the address does not exist, create a new record
            console.log("Creating new record...");
            result = await RecentAnalysis.create(details);
        }

        res.status(200).json({
            success: true,
            data: result, // Return the result for debugging
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});


export const RecentAnalysisCoin=catchAsyncError(async(req,res)=>{
    const recentDocuments = await RecentAnalysis.find()
      .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
      .limit(10); 
      res.status(200).json({
        success: true,
        result:recentDocuments
    })
    console.log(recentDocuments)
});

