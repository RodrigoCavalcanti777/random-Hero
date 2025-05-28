const express = require('express');
const route = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

route.post('/createHero', async (req,res) =>{
    const {name, age,sex, ability, background, studio} = req.body;

    // tratamento para héroi existente

    try {
        
        const newHero = await prisma.personagem.create({
            data: {
                name,
                age,
                sex,
                ability,
                background,
                studio
            }

        })

        res.status(200).json({
            message: 'Personagem Criado com sucesso',
            newHero
        })

    } catch (error) {
        res.status(500).json({
            message: ('Erro ao Cadastrar personagem', error)
        })
    }
})


module.exports = route; 