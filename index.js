// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// === Banco de dados simples em memória ===
let messages = [];

// === Rota raiz (keep-alive) ===
app.get('/', (req, res) => {
    res.send('Servidor Global Online 😎');
});

// === Rota para pegar mensagens ===
app.get('/chat/messages', (req, res) => {
    res.json(messages);
});

// === Rota para enviar mensagens ===
app.post('/chat/send', (req, res) => {
    const { user, message, role } = req.body;
    if (!user || !message) return res.sendStatus(400);

    messages.push({
        user,
        message,
        role: role || 'Staff',
        time: Date.now()
    });

    // Mantém só as últimas 100 mensagens
    if (messages.length > 100) messages.shift();

    res.sendStatus(200);
});

// === Keep-alive interno opcional ===
setInterval(() => {
    console.log('Keep-alive ativo 😏');
}, 60 * 1000); // a cada 1 min

// === Inicializa servidor ===
app.listen(PORT, () => console.log(`Servidor Global rodando na porta ${PORT}`));
