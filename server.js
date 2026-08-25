//isaacsantos7r_db_user
//ce6BPLrzGIin7jWL
//start from scratch
//Detendo conhecimento Nodejs

//Aqui eu estou importando a biblioteca no caso a express

import { PrismaClient } from "./generated/prisma/client.js";
import express from "express";

//app é a nossa aplicação Express. É através dela que vamos criar as rotas, como GET e POST, e configurar o servidor.
const app = express();
const prisma = new PrismaClient();
//Estamos guardando os nossos usuarios

//Temos que avisar para o express que estamos usando json se não ele não mostra o body
app.use(express.json());

//`:` diz que criamos uma variavel , porque sempre precisamos da variavel para guardar um valor

//cria uma rota GET, que apenas busca a lista de usuarios
app.get("/usuarios", async (req, res) => {
    //Estamos mandnado a informação que ja temos
    const users = await prisma.user.findMany()

    res.status(200).json(users);
});
//cria uma rota POST

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