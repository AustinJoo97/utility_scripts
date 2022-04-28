let axios = require('axios');
const removeAllUsers = async () => {
    const xApiKey = ''; //Enter API Key here
    let allUsers = [];
    const getAllUsers = async (num) => {
        if(num === 1){
            console.log('\x1b[33m%s\x1b[0m', `RETRIEVING ALL  USERS`);
        }
        
        let page = num;
        await axios({
            method: 'get',
            url: 'https://api.northpass.com/v2/people/?page=' + page + '&limit=100',
            headers: {
                'accept': '*/*',
                'x-api-key': xApiKey,
                'content-type': 'application/json'
            }
        })
        .then(async (res) => {
    
        if (res.data.links.next != null) {
            page++;
            for (let i = 0; i < res.data.data.length; i++) {
                allUsers.push(res.data.data[i]);
            }
            await getAllUsers(page);
        } else {
            for (let i = 0; i < res.data.data.length; i++) {
                allUsers.push(res.data.data[i]);
            }
        }
        })
        .catch(err => {
            console.log(err);
        })
    }

    let deleteUser = async (someUser) => {
        await axios({
            method: 'delete',
            url: 'https://api.northpass.com/v2/people/' + someUser.id,
            headers: {
                'accept': '*/*',
                'x-api-key': xApiKey,
                'content-type': 'application/json'
            }
        })
        .catch(err => {console.log(err)})
    }

    await getAllUsers(1)
    .then(async () => {
        console.log('\x1b[33m%s\x1b[0m', `BEGINNING TERMINATION SEQUENCE`)
        let i = 0;

        while(i < allUsers.length){
            let currentUser = allUsers[i];
            if(currentUser.id === '8291ba8e-b3fa-4565-b33e-dc93ac1c5c8c'){
                i++;
                currentUser = allUsers[i];
            }

            await deleteUser(currentUser)
            .then(() => {
                i++;
            })
            .catch(err => {console.log(err)});
        }

        console.log('\x1b[33m%s\x1b[0m', `TERMINATED`)
    })
    .catch(err => {console.log(err)});
}

removeAllUsers();