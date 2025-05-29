require('dotenv').config()
const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


route.post('/login',async (req,res) =>{

    const {name,password,email} = req.body;


    const validateRegisterUser = await prisma.usuario.findUnique({
        where: {email: email}
    })

    if(!validateRegisterUser){
       return res.status(500).json({
            message: 'Usuario não cadastrado na aplicação'
        })

    }    

    const nameRegister = validateRegisterUser.name;

    if(name != nameRegister){
        return res.status(500).json({
            message: "Username não existente"
        })
    }

    //realizar login

    const correctPassword = bcrypt.compareSync(password, validateRegisterUser.password)

    if(!correctPassword){
       return res.status(500).json({message: 'Senha Incorreta'})
    }

    
    const token = jwt.sign({ 
        id: validateRegisterUser.id, 
        email: validateRegisterUser.email 
    }, 
    
    process.env.JWT_SECRET, 
    { expiresIn: '1h' } 
    )

    return res.status(200).json({
        message: 'Login realizado com Sucesso',
        token: `Bearer ${token}`
    })

})

module.exports = route;

