//Detendo conhecimento Nodejs

//Aqui eu estou importando a biblioteca no caso a express
import express from 'express'

//app é a nossa aplicação Express. É através dela que vamos criar as rotas, como GET e POST, e configurar o servidor.
const app = express()

//Temos que avisar para o express que estamos usando json se não ele não mostra o body
app.use(express.json())

//`:` diz que criamos uma variavel , porque sempre precisamos da variavel para guardar um valor
//cria uma rota GET
app.get('/get/:id', (req, res) => {

    //Aqui estamos imprimindo a requização
    console.log(req)

    res.send("get Acessado")

})

//cria uma rota POST
app.post('/post/:id', (req, res) => {

    //Aqui estamos imprimindo a requização
    console.log(req)

    res.send("post Acessado")

})

//coloca o servidor para "escutar" na porta 3000.
app.listen(3000)