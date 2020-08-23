const readline = require("readline");
const fs = require("fs");
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
            rl.question("Do you want to add another question? (y/n)", (answer) => {
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
    (new Promise((resolve) => {
        createQuestion(resolve, [])
    }))
        .then(questions => {
            console.log(questions);
            const writer = fs.createWriteStream(`../src/data/${fileName}.json`)
            writer.write(JSON.stringify(questions));
            rl.close();
        });
});