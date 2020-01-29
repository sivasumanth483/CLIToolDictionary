const { definition,
    synsAnto,
    example } = require('../services/dictionaryService');
const { formatDefinitionResp,
    formatSynAntoResp,
    formatExampleResp } = require('../ResponseFormatter/ResponseFormatter');


const getAllDataWord = async (word) => {
    let examResponse = await example(word);
    let wordExamples = formatExampleResp(examResponse, word);
    console.log(wordExamples);

    let synAntResponse = await synsAnto(word);
    let antoList = formatSynAntoResp(synAntResponse, "antonym", word);
    let synList = formatSynAntoResp(synAntResponse, "synonym", word);
    console.log(antoList);
    console.log(synList);

    let defResponse = await definition(word);
    let def = formatDefinitionResp(defResponse, word);
    console.log(def);
}


module.exports = {
    getAllDataWord
};