//isaacsantos7r_db_user
//ce6BPLrzGIin7jWL
//start from scratch
//Detendo conhecimento Nodejs

//Aqui eu estou importando a biblioteca no caso a express
import express from 'express'

//app é a nossa aplicação Express. É através dela que vamos criar as rotas, como GET e POST, e configurar o servidor.
const app = express()
//Estamos guardando os nossos usuarios
const users = []

//Temos que avisar para o express que estamos usando json se não ele não mostra o body
app.use(express.json())

//`:` diz que criamos uma variavel , porque sempre precisamos da variavel para guardar um valor
//cria uma rota GET, que apenas busca a lista de usuarios
app.get('/get/', (req, res) => {

    //Estamos mandnado a informação que ja temos
    res.status(200).json(users)

})

//cria uma rota POST
app.post('/post/', (req, res) => {
    //aqui estamos mandando apenas a informação do body 
    users.push(req.body)
    //É aqui estamos respondendo de uma maneira mais bonita
    res.status(201).json({ mensagem: "Usuario Criado com sucesso" })

})

//coloca o servidor para "escutar" na porta 3000.
app.listen(3000)