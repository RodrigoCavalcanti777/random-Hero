const express = require('express');
const route = express.Router();
const bcrypt = require('bcryptjs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//rota para criar usuario
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

//rota para listar todos os usuario da aplicacao
route.get('/users', async (res) =>{

    try {
        const getAllUsers = await prisma.usuario.findMany();

        res.status(200).json({
            message: 'Lista de todos os users da aplicacao',
            getAllUsers
        })
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao listar todos os users'
        })
    }
})


//rota para listar um usuario especifico

route.get('/users/:id', async (req, res) =>{

        const {id} = req.params;


        try {
            const listUser = await prisma.usuario.findUnique({
                where: {id : Number(id)}
            })
            
            if(!listUser){
                return res.status(500).json({
                    message: 'Id de usuario nao existente'
                })
            }

            res.status(200).json({
                message: 'User retornado com sucesso',
                listUser
            })

        } catch (error) {
            res.status(500).json({
                message: 'Erro ao retornar usuario',
                error
            })
        }
})

module.exports = route;