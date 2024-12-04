const {kafka} = require('./client');

async function init(){
    const admin = kafka.admin();
    console.log('Connecting Admin...');
    await admin.connect();
    console.log('Admin connected.')

    console.log('Creating Topic...');
    await admin.createTopics({
        topics:[
            {
                topic:'rider-updates',
                numPartitions:2
            }
        ]
    });
    console.log('Topic created [ rider-updates ]');
    console.log('Disconnecting Admin...')
    await admin.disconnect();
    console.log('Admin disconnected.')
}

init()
