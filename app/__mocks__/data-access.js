const insertTrueToSizeRatings = async (id, sneakers, true_to_size_rating) => {
    return { rows : [{ id, sneakers, true_to_size_rating }] };
}

const selectTrueToSizeRatings = async (sneakers) => {
    const rows = sneakers === "Nike Air Monarchs"
        ? [] : [ { true_to_size_rating: 3 }, { true_to_size_rating: 5 } ];
    return { rows };
}

module.exports = { insertTrueToSizeRatings, selectTrueToSizeRatings };