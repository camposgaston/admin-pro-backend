require('dotenv').config();

const express = require('express');
const cors = require('cors');


const { dbConnection } = require('./database/config');

//create express server
const app = express();

//CORS config
app.use(cors());

//Data base
dbConnection();


//Routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });

});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto with nodemon ' + process.env.PORT);
});