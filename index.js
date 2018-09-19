//Let's build a chat
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Ensure validation of key information
const Joi = require('joi');

app.use(bodyParser.json());

const users = [
    {id: 1, username: 'user1'},
    {id: 2, username: 'user2'},
    {id: 3, username: 'user3'},
    {id: 4, username: 'user4'}
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

    if(!user) res.status(404).send('User not found');
    
    res.send(user);
});

//POST 

app.post('/api/users', (req, res) => {

    const schema = Joi.object({
        username: Joi.string().min(3).required()
    });

    const result = Joi.validate(req.body, schema);

    if(result.error) {
        res.status(404).send(result.error.details[0].message);
    } else {

        const user = {
            id: users.length + 1,
            username: req.body.username
        }
    
        users.push(user);
    
        res.send(users);

    }

});

//PUT 

app.put('/api/users/:id', (req, res) => {
    const user = users.find( u => {
        if(u.id == parseInt(req.params.id)) return u;
    });

    if(!user) res.status(404).send('User not found');

    user.name = req.body.name;

    res.send(user);

});

//DELETE 

app.delete('/api/users/:id', (req, res) => {
    const user = users.find( u => {
        if(u.id == parseInt(req.params.id)) return u;
    });

    if(!user) res.status(404).send('User not found');

    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send(users);
});

const port = process.env.PORT || 8080;

app.listen(port, () => { console.log(`Serveur en écoute sur le port ${port}`)});

