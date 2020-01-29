const { definition } = require('../services/dictionaryService');
const { readUserInput } = require('../utils/readUserInput');
const { validateUserInput } = require('../utils/validateUserInput');
const { selectReentry } = require('../utils/selectReentry');
const { getAllDataWord } = require('../utils/getWordDetails');
const chalk = require('chalk');

const playDefinition = async (word, createNewWordFlag, def) => {
    let userInput;
    if (createNewWordFlag) {
        console.log(`\nPlease enter the synonym for ${chalk.bold(word)}:\n`);
        userInput = await readUserInput("gameType", /^[a-zA-Z\s\-]+$/, "Enter only text \n");
        def = await definition(word);
        console.log(def);
        def = getSynonymsArray(def);
    } else {
        userInput = await readUserInput(`Enter the  `, /^[a-zA-Z\s\-]+$/, "Enter only text \n");
    }
    if (validateUserInput(userInput, def) > 0.7) {
        console.log("\nHurray you won the game");
    } else {
        let retryEntry = await selectReentry();
        if (retryEntry == 1) {
            console.log("\n");
            playDefinition(word, false, def);
        } else if (retryEntry == 2) {
            console.log("\nHere is the hint for you.", chalk.bold(def[1].shuffle()));
            playDefinition(word, false, def);
        } else {
            return await getAllDataWord(word);
        }

    }
};

const getSynonymsArray = (data) => {
    data = JSON.parse(data);
    let defArray = [];
    data.forEach(element => {
        defArray.push(element.text);
    });
    return defArray;
};

module.exports = {
    playDefinition
};