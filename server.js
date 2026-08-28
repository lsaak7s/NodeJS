//start from scratch

//Detendo conhecimento Nodejs

//Aqui eu estou importando as bibliotecas
import { PrismaClient } from "./generated/prisma/client.js";
import express from "express";

//Aqui estamos colocando nossas Frameorks em variaveis
const app = express();
const prisma = new PrismaClient();

//Temos que avisar para o express que estamos usando json se não ele não mostra o body
app.use(express.json());

//cria uma rota GET, que apenas busca a lista de usuarios
app.get("/usuarios", async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users);
});

//cria uma rota POST que cria usuarios
app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name,
        },
    });

    res.status(201).json({ mensagem: "Usuario Criado com sucesso" });
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