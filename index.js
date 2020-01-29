#!/usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');

const { definition,
    synsAnto,
    example,
    randomWord } = require('./services/dictionaryService');

const { game } = require('./services/game');

const { formatDefinitionResp,
    formatSynAntoResp,
    formatExampleResp,
    returnRandomWord } = require('./ResponseFormatter/ResponseFormatter');

const { getAllDataWord } = require('./utils/getWordDetails');

// console.log(process.argv);

yargs.version('10.0.0');


yargs.command({
    command: 'defn <word>',
    usage: "defn <command>",
    describe: 'Get the definition of the word',
    builder: {
        word: {
            describe: 'Specify any word',
            demandOption: true,
            type: 'string'
        }
    },
    handler: async function (argsv) {
        let apiResponse = await definition(argsv.word);
        let def = formatDefinitionResp(apiResponse, argsv.word);
        console.log(def);

    }
});

yargs.command({
    command: 'syn <word>',
    describe: 'Get the synonym of the word',
    builder: {
        word: {
            describe: 'Specify any word',
            demandOption: true,
            type: 'string'
        }
    },
    handler: async function (argsv) {
        let apiResponse = await synsAnto(argsv.word);
        let synoList = formatSynAntoResp(apiResponse, "synonym", argsv.word);
        console.log(`${synoList}`);

    }
});

yargs.command({
    command: 'ant <word>',
    describe: 'Get the antonym of the word',
    builder: {
        word: {
            describe: 'Specify any word',
            demandOption: true,
            type: 'string'
        }
    },
    handler: async function (argsv) {
        let apiResponse = await synsAnto(argsv.word);
        let antoList = formatSynAntoResp(apiResponse, "antonym", argsv.word);
        console.log(antoList);

    }
});

yargs.command({
    command: 'ex <word>',
    describe: 'Get the examples of the given word',
    builder: {
        word: {
            describe: 'Specify any word',
            demandOption: true,
            type: 'string'
        }
    },
    handler: async function (argsv) {
        let apiResponse = await example(argsv.word);
        let wordExamples = formatExampleResp(apiResponse, argsv.word);
        console.log(wordExamples);
    }
});

yargs.command({
    command: "$0 [word]",
    describe: "this is the default yargs",
    handler: async function (argsv) {
        let word = argsv.word;
        if (!argsv.word) {
            let apiResponse = await randomWord();
            word = returnRandomWord(apiResponse);
            console.log("Word of the Day", chalk.bold(word));
        }
        getAllDataWord(word);
    }
});

yargs.command({
    command: "play",
    describe: "This is will starts the game",
    handler: async function () {
        game();
    }
});

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

yargs.parse();

