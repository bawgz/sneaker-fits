const uuidv4 = require('uuid/v4');
const { insertTrueToSizeRatings, selectTrueToSizeRatings } = require('./data-access');
const logger = require('./logger');

const submitTrueToSizeRating = async (req, res) => {
    logger.info({ message: "Request received in submitTrueToSizeRating", body: req.body });
    const { sneakers, true_to_size_rating } = req.body;
    if (!Number.isInteger(true_to_size_rating) || true_to_size_rating < 1 || true_to_size_rating > 5) {
        return res.status(400).send({ "error": "true_to_size_rating must be a number between 1 and 5" });
    }
    if (sneakers === null || typeof sneakers !== "string" || sneakers === "") {
        return res.status(400).send({ "error": "sneakers must be a non-empty string" });
    }
    try {
        const dbRes = await insertTrueToSizeRatings(uuidv4(), sneakers, true_to_size_rating);
        logger.info({ message: "Response from database received in submitTrueToSizeRating", rows: dbRes.rows });
        return res.status(201).send(dbRes.rows[0]);
    } catch (e) {
        logger.error(e);
        return res.status(500).send({ "error": "Internal Server Error" });
    }
}

const calculateTrueToSizeAvg = async (req, res) => {
    logger.info({ message: "Request received in calculateTrueToSizeAvg", query: req.query });
    try {
        const dbRes = await selectTrueToSizeRatings(req.query.sneakers);
        logger.info({ message: "Response from database received in calculateTrueToSizeAvg", rows: dbRes.rows });
        if (dbRes.rows.length === 0) {
            return res.status(404).send({ "error": "Sneakers not found" });
        }
        let total = 0;
        dbRes.rows.forEach(row => {
            total += row.true_to_size_rating;
        });

        return res.status(200).send({ true_to_size_calculation: total / dbRes.rows.length });
    } catch (e) {
        logger.error(e);
        return res.status(500).send({ "error": "Internal Server Error" });
    }
}

module.exports = { submitTrueToSizeRating, calculateTrueToSizeAvg };