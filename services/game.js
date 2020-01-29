const { readUserInput } = require('../utils/readUserInput');
const { playSynAnt } = require('../services/playSynonyms');
const { randomWord } = require('../services/dictionaryService');
const { playDefinition } = require('../services/playDefinition');
const game = async () => {
    console.log(`Let's play game 
choose from the below :
1.Synonym
2.Antonym
3.Definition\n`);

    let gameType = await readUserInput("game", /^[1-3]/, "Enter only numbers between 1-3\n");
    // console.log(".......................", gameType);
    let word = JSON.stringify({
        word: "tender"
    });

    //await randomWord();
    //
    //
    word = JSON.parse(word);
    if (gameType == 1) {
        playSynAnt(word.word, true, "synonym");
    } else if (gameType == 2) {
        playSynAnt(word.word, true, "antonym");
    } else if (gameType == 3) {
        playDefinition(word.word, true);
    }

};

module.exports = {
    game
};