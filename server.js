//start from scratch

//Detendo conhecimento Nodejs

//Aqui eu estou importando as bibliotecas

import 'dotenv/config';

import { PrismaClient } from "./generated/prisma/index.js";
import express from "express";
//Protocolo de segurança
import cors from 'cors';

//Aqui estamos colocando nossas Frameorks em variaveis
const app = express();
//Aqui estamos dizendo quem pode usar
app.use(cors('http://localhost:5173'));

const prisma = new PrismaClient();

//Temos que avisar para o express que estamos usando json se não ele não mostra o body
app.use(express.json());

//cria uma rota GET, que apenas busca a lista de usuarios
app.get("/usuarios", async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        return res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            erro: "Não foi possível buscar os usuários."
        });
    }
})

//cria uma rota POST que cria usuarios
app.post('/usuarios', async (req, res) => {
    //try ele verifica se teve algun erro
    try {
        await prisma.user.create({
            data: {
                email: req.body.email,
                age: req.body.age,
                name: req.body.name,
            },
        });

        res.status(201).json({ mensagem: "Usuario Criado com sucesso" });

    }//se teve ele avisa para o catch
    catch (err) {
        return response.status(500).json({ erro: err.mensagem });
    }// e se quiser conferir que rodou mesmo usar o finally
    finally { console.log("terminou") }


})
//A rota PUT altera os usuarios
app.put('/usuarios/:id', async (req, res) => {

    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name,
        },
    });

    res.status(201).json({ mensagem: "Usuario Alterado com sucesso" });
})
//A rota delete deleta os usuarios
app.delete('/usuarios/:id', async (req, res) => {

    const user = await prisma.user.delete({
        where: {
            id: req.params.id
        },
    });

    res.status(201).json({ mensagem: "Usuario Deletado com sucesso" });
})

//coloca o servidor para "escutar" na porta 3000.
app.listen(3000);