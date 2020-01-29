const { readUserInput } = require('./readUserInput');
const selectReentry = async () => {
    console.log("\nIncorrect word entered \n 1.TryAgain \n 2.Hint \n 3.Quit\n");
    let userInput = await readUserInput("user", /^[1-3]/, "Enter only numbers between 1-3\n");
    return userInput;
};

module.exports = {
    selectReentry
};