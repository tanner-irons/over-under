const csv = require('csv-parser');
const fs = require('fs');
const { performance } = require('perf_hooks');

const questions = new Map();
fs.createReadStream('./csv/example.csv')
    .pipe(csv())
    .on('data', (row) => {
        Object.entries(row)
            .filter(([question, response]) => response && question !== 'Timestamp')
            .forEach(([question, response]) => {
                const responses = questions.get(question);
                questions.set(question, [...(responses || []), response === 'Yes']);
            });
    })
    .on('end', () => {
        const responses = Array.from(questions).map(([question, responses]) => {
            const percentage = Math.round((responses.filter(response => !!response).length / responses.length) * 100);
            return { prompt: question.replace('Do you', 'What percentage of Centarians'), count: responses.length, percentage };
        });
        const writer = fs.createWriteStream('../src/data/questions.json')
        writer.write(JSON.stringify(responses));
        writer.end();
    });