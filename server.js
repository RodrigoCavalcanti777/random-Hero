const express = require('express');
const app = express();
const createUser = require('./src/controllers/users')
const createHero = require('./src/controllers/hero')
const login = require('./src/controllers/login');

app.use(express.json());

const port = 8000;


app.use(createUser);
app.use(createHero);
app.use(login); 



app.listen(port, () =>{
   try {
    console.log('Servidor Iniciado com Sucesso...');
   } catch (error) {
    console.log('Erro ao iniciar o servidor', error);
   }
});