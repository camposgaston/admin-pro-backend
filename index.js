require('dotenv').config();

const express = require('express');
const cors = require('cors');


const { dbConnection } = require('./database/config');

//create express server
const app = express();

//CORS config
app.use(cors());

//body reading
app.use(express.json());

//Data base
dbConnection();


//Routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/hospitals', require('./routes/hospitals.routes'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto with nodemon ' + process.env.PORT);
});