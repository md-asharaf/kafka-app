const { kafka } = require('./client');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init() {
    const producer = kafka.producer();
    console.log('Connecting Producer...');
    await producer.connect();
    console.log('Producer connected.');
    rl.setPrompt('> ');
    rl.prompt();
    rl.on('line', async (line) => {
        const [riderName, location] = line.split(' ');
        console.log('Sending message...');
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: location.toLowerCase() === 'north' ? 0 : 1,
                    key: 'location-updates',
                    value: JSON.stringify({
                        name: riderName,
                        location
                    })
                }
            ]
        })
        console.log('Message sent.');
    }).on('close', async () => {
        console.log('Disconnecting Producer...');
        await producer.disconnect();
        console.log('Producer disconnected.');
        process.exit(0);
    });
}

init();