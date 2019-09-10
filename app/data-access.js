const { Pool } = require('pg');

const pool = new Pool();

const INSERT_QUERY = 'INSERT INTO true_to_size_ratings(id, sneaker, true_to_size_rating) VALUES($1, $2, $3) RETURNING *';
const SELECT_QUERY = 'SELECT true_to_size_rating FROM true_to_size_ratings WHERE sneaker = $1';

const insertTrueToSizeRatings = async (id, sneakers, true_to_size_rating) => {
    return pool.query(INSERT_QUERY, [id, sneakers, true_to_size_rating]);
}

const selectTrueToSizeRatings = async (sneakers) => {
    return pool.query(SELECT_QUERY, [sneakers]);
}

module.exports = { insertTrueToSizeRatings, selectTrueToSizeRatings };