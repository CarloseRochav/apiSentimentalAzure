const express = require("express");
const app = express();//
const port = 3030;
const azureController = require("./azureController");


//Uso de bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Ruta de Hola Mundo
app.get("/", (req, res) => {
    res.send("Hello World");
})




//Ruta para obtener comentarios de una publicacion
//app.post("/send-content",commentController.getCommnetsByAPost)
app.post("/send-content",azureController.sendData)


console.log("Archivo ejecutado")


app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

    
})

