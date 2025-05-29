const express = require('express');
const route = express.Router();
const bcrypt = require('bcryptjs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

route.post('/createUser', async (req, res) => {
    const { name, email, password } = req.body;  


    const existentUser = await prisma.usuario.findUnique({
        where: {email:email}
    })

    if(existentUser){
        res.status(500).json({
            message: "Usuario Já cadastrado..."
        })
    }

    const ocultpassword = await bcrypt.hash(password,10);

    try {
       
        const newUser = await prisma.usuario.create({
            data: { 
                name, 
                email, 
                password: ocultpassword
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