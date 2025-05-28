const express = require('express');
const app = express();
const createUser = require('./src/controllers/users')
const createHero = require('./src/controllers/hero')

app.use(express.json());

const port = 8000;


app.use(createUser);
app.use(createHero);



app.listen(port, (erro) =>{


    if (erro) {

        console.log('Erro ao iniciar servidor...');

    } else {

        console.log('Servidor iniciado com sucesso...')

    }
});