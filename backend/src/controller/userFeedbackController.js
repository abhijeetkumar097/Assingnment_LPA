const feedback = require('../model/userFeedback');

exports.getAllFeedback = async(req, res) => {
    try {
        const feed = await feedback.find();
        res.status(200).json(feed);
    }
    catch(error) {
        res.status(500).json({ error : error.message });
    }
}

exports.storeFeedback = async(req, res) => {
    try {
        const feed = await feedback.create(req.body);
        return res.status(201).json(feed);
    }
    catch(error) {
        res.send(400);
    }
}