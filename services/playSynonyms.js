const { synsAnto } = require('../services/dictionaryService');
const { readUserInput } = require('../utils/readUserInput');
const { validateUserInput } = require('../utils/validateUserInput');
const { selectReentry } = require('../utils/selectReentry');
const { getAllDataWord } = require('../utils/getWordDetails');
const chalk = require('chalk');

const playSynAnt = async (word, createNewWordFlag, gameType, synAnt) => {
    let userInput;
    if (createNewWordFlag) {
        console.log(`\nPlease enter the ${gameType} for ${chalk.bold(word)}:\n`);
        userInput = await readUserInput(gameType, /^[a-zA-Z\s\-]+$/, "Enter only text \n");
        synAnt = await synsAnto(word);
        synAnt = getSynonymsArray(synAnt, gameType);
        // console.log(synAnt);
    } else {
        userInput = await readUserInput(`Enter the ${gameType} `, /^[a-zA-Z\s\-]+$/, "Enter only text \n");
    }
    if (validateUserInput(userInput, synAnt) > 0.7) {
        // console.log("validated", validateUserInput(userInput, synAnt));
        console.log(chalk.bold("\nHurray you won the game"));
    } else {
        let retryEntry = await selectReentry();
        if (retryEntry == 1) {
            console.log("\n");
            playSynAnt(word, false, gameType, synAnt);
        } else if (retryEntry == 2) {
            let randomnumber = Math.floor(Math.random() * synAnt.length)
            console.log("\nHere is the hint for you:", chalk.bold(synAnt[randomnumber].shuffle()));
            playSynAnt(word, false, gameType, synAnt);
        } else {
            return await getAllDataWord(word);
        }

    }
};

const getSynonymsArray = (data, gameType) => {
    data = JSON.parse(data);
    for (let index = 0; index < data.length; index++) {
        if (data[index].relationshipType.toLowerCase() == gameType) {
            return data[index].words;
        }

    }
    console.log(`No ${gameType} found for the word here. Please restart the game.`);
    process.exit();
};

module.exports = {
    playSynAnt
};