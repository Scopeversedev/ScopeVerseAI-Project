import catchAsyncError from '../middlewares/catchAsyncError.js';
import FeedBack from '../models/FeedBack.js';

// Submit feedback
export const FeedBackSubmit = catchAsyncError(async (req, res, next) => {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Create new feedback
    const feedback = await FeedBack.create({ name, email, message });

    res.status(201).json({
        success: true,
        data: feedback
    });
});

// Get all feedbacks
export const FeedBacks = catchAsyncError(async (req, res, next) => {
    const feedbacks = await FeedBack.find();

    res.status(200).json({
        success: true,
        data: feedbacks
    });
});
