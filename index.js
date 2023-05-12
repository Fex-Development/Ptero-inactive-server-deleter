     const axios = require('axios');
      const config = require('./config.json')

     const headers = {
        'Authorization': `Bearer ptla_T9I336GviVujVYCKePGho5a2uzWOrVAP8mZcmQLwg9r`,
         'Content-Type': 'application/json'
    };

axios.get(`${config.url}` + 'api/application/servers', { headers })
    .then(response => {
        const unsafeServers = response.data.data.filter(server => !server.attributes.name.includes(`${config.keyword}`));

        unsafeServers.forEach(server => {
            axios.delete(`${config.url}api/application/servers/${server.attributes.id}`, { headers })
                .then(response => {
                    console.log(`Server ${server.attributes.name} has been deleted.`);
                })
                .catch(error => {
                    console.log(`An error occurred while deleting server ${server.attributes.name}: ${error}`);
                });
        });
    })
    .catch(error => {
        console.log(`An error occurred while fetching servers: ${error}`);
    });
