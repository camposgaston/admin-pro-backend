require('dotenv').config();
const path = require('path');

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

// Public folder
app.use(express.static('public'));

//Routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/hospitals', require('./routes/hospitals.routes'));
app.use('/api/doctors', require('./routes/doctors.routes'));
app.use('/api/all', require('./routes/searchs.routes'));
app.use('/api/upload', require('./routes/uploads.routes'));

//any other route:
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto with nodemon ' + process.env.PORT);
});