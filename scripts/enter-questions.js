const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const createQuestion = (resolve, questions) => {
    rl.question("What is the question? ", (prompt) => {
        rl.question("What is the percentage?", (percentage) => {
            questions.push({
                prompt,
                percentage
            });
            rl.question("Do you want to add another question (Y/N)?", (answer) => {
                if (answer.toLowerCase() !== 'n') {
                    createQuestion(resolve, questions);
                }
                else {
                    resolve(questions);
                }
            });
        });
    })
};

rl.question("What should this json file be called?", (fileName) => {
    new Promise(resolve => createQuestion(resolve, []))
        .then(questions => {
            const writer = fs.createWriteStream(`../src/data/${fileName}.json`)
            writer.write(JSON.stringify(questions));
            writer.end();
            rl.close();
        });
});