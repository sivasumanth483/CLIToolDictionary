const request = require('request');
const config = require('../config/config.json');


const definition = (word) => {
    return new Promise((resolve, reject) => {
        let url = config.hostName + config.definition.replace("{word}", word).replace("{api_key}", config.api_key);
        request(url, (err, body, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const synsAnto = (word) => {
    return new Promise((resolve, reject) => {
        let url = config.hostName + config.relatedWord.replace("{word}", word).replace("{api_key}", config.api_key);
        request(url, (err, body, res) => {
            if (err) {
                console.log("..........", err);
                reject(err);
            } else {
                // console.log("..........", res);
                resolve(res);
            }
        });
    });

};

const example = (word) => {
    return new Promise((resolve, reject) => {
        let url = config.hostName + config.examples.replace("{api_key}", config.api_key).replace("{word}", word);
        request(url, (err, body, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const randomWord = () => {
    return new Promise((resolve, reject) => {
        let url = `https://fourtytwowords.herokuapp.com/words/randomWord?api_key=${config.api_key}`;
        request(url, (err, body, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = {
    definition,
    synsAnto,
    example,
    randomWord
};