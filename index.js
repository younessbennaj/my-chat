//Let's build a chat
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const users = [
    {id: 1, name: 'user1'},
    {id: 2, name: 'user2'},
    {id: 1, name: 'user3'},
    {id: 2, name: 'user4'}
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

//Our API

//On veut pouvoir gérer des utilsateurs via notre API 

//GET 

app.get('/api/users', (req, res) => {
    res.send(users);
});

app.get('/api/users/:id', (req, res) => {   
    const user = users.find( u => {
        if(u.id == parseInt(req.params.id)) return u;
    });
    res.send(user);
});

//POST 

app.post('/api/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name
    }

    users.push(user);

    res.send(users);
});

const port = process.env.PORT || 8080;

app.listen(port, () => { console.log(`Serveur en écoute sur le port ${port}`)});

