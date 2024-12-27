const sendResponse = (success, statusCode, message, res) => {
	res.status(statusCode).json({
		success,
		message
	});
}

export default sendResponse;