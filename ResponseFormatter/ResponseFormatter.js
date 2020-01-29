const chalk = require('chalk');
const formatDefinitionResp = (response, word) => {
    try {
        response = JSON.parse(response);
        let sendResponse = chalk`{bold.underline \nDefinition for ${word}:\n\n}`;
        if (Array.isArray(response) && Array.length > 0) {
            response.forEach(element => {
                sendResponse = sendResponse + chalk.bold("--> ") + element.text + "\n";
            });
        } else {
            sendResponse = "No Definition Found";
        }
        return sendResponse;
    } catch (error) {
        return "No Definition Found...";
    }
};

const formatSynAntoResp = (response, type, word) => {
    try {
        response = JSON.parse(response);
        if (Array.isArray(response) && Array.length > 0) {
            let responseString = chalk`{bold.underline ${type}'s for ${word}:} \n--> `;
            let list;
            response.forEach(element => {
                if (element.relationshipType.toLowerCase() == type) {
                    list = element.words.length > 0 ? element.words.join("\n--> ") : `No ${type} Found`;
                }
            });
            if (list)
                return responseString + list + "\n";
            else
                return chalk`{bold.underline ${type}'s for ${word}:} Not Found\n`;
        } else {
            return chalk`{bold.underline ${type}'s for ${word}:} Not Found\n`;
        }
    } catch (error) {
        return chalk`{bold.underline ${type}'s for ${word}:} Not Found\n`;
    }
    
};

const formatExampleResp = (response, word) => {
    try {
    response = JSON.parse(response);
    let wordEx = chalk`{bold.underline \nexamples for ${word}:\n\n}`;
    if (response.examples) {
        response.examples.forEach((element, index) => {
            wordEx = wordEx + chalk.bold("--> ") + element.text + "\n";
        });
        return wordEx;
    } else {
        return "No examples found for the given word";
    }
    }catch (error) {
        return "No examples found for the given word";
    }
};

const returnRandomWord = (data) => {
    data = JSON.parse(data);
    return data.word;
};

module.exports = {
    formatDefinitionResp,
    formatSynAntoResp,
    formatExampleResp,
    returnRandomWord
};

