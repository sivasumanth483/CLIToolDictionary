const prompt = require('prompt');

function readUserInput(property, regex, errormsg) {
    return new Promise((resolve, reject) => {
        const properties = [
            {
                name: [property],
                validator: regex,
                warning: errormsg
            }
        ];

        prompt.start();

        prompt.get(properties, function (err, result) {
            if (err) { return onErr(err); }
            // console.log('Command-line input received:', result[property]);
            resolve(result[property]);
        });

        function onErr(err) {
            console.log("\n\nThanks for playing.");
            return 1;
        }
    });
}

module.exports = {
    readUserInput
};

// readUserInput("number");