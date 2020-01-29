var stringSimilarity = require('string-similarity');

const validateUserInput = (userinput, data) => {
    let similarity = stringSimilarity.findBestMatch(userinput, data);
    // console.log("\n\n\n", similarity);
    return similarity.bestMatch.rating;
};

module.exports = {
    validateUserInput
};