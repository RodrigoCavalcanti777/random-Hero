const express = require('express');
const route = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

route.post('/createUser', async (req, res) => {
    const { name, email, password } = req.body;  

    try {
       
        const newUser = await prisma.usuario.create({
            data: { 
                name, 
                email, 
                password 
            }
        });

        res.status(201).json({
            mensagem: 'Usuário criado com sucesso!',
            usuario: newUser
        });

    } catch (error) {
        console.log('Erro ao Criar usuário', error);
        res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
        
})



module.exports = route;