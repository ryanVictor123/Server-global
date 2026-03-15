const express = require("express");
const app = express();

app.use(express.json());

let chat = [];

app.post("/chat/send", (req,res)=>{
    chat.push({
        user: req.body.user,
        message: req.body.message
    });

    res.json({status:"ok"});
});

app.get("/chat/messages",(req,res)=>{
    res.json(chat);
});

app.listen(3000, ()=>{
    console.log("Servidor rodando");
});
