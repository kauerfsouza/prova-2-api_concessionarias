const express = require('express');
const app = express();
const PORT = 3000;

// Importações
const DBConnect = require('./database/connection');
const autenticacaoRoutes = require('./routes/AutenticacaoRoutes');
const { checkToken } = require('./validators/AutenticacaoValidator');
const routes = require('./routes/routes');


// Conexão com o banco de dados
DBConnect();


app.use(express.json());


app.use(autenticacaoRoutes);


app.use(checkToken, routes);



// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}`);
});
