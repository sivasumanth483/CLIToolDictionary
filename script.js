var exec = require('child_process').exec;
exec('npm install', (error, stdout, stderr) => {
    if (error) {
        console.log("error while installing modules", error);
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    createCli();
});

function createCli() {
    exec('npm link', (error, stdout, stderr) => {
        if (error) {
            console.log("error while installing modules", error);
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}