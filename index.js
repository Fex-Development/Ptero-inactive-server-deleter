const fetch = require('node-fetch');
const config = require('./config.json');

fetch(`${config.url}api/application/servers`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${config.api}`,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    const getto = data.data.filter(server => !server.attributes.name.includes(config.keyword));

    getto.foreach(server => {
        fetch(`${config.url}api/application/servers/${server.attributes.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${config.api}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(`Server ${server.attributes.name} has been gased.`);
        })
        .catch(error => {
            console.log(`An error allowed this server to exist ${server.attributes.name}: ${error}`);
        });
    });
})
.catch(error => {
    console.log(`An error has slipped through our systems: ${error}`);
});
