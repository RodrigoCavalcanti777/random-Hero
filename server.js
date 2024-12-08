const express = require('express');
const app = express();
const createUser = require('./src/controllers/users')

app.use(express.json());

const port = 8000;

//rota de criação de usuario
app.use(createUser);



app.listen(port, (erro) =>{


    if (erro) {

        console.log('Erro ao iniciar servidor...');

    } else {

        console.log('Serviodor iniciado com sucesso...')

    }
});