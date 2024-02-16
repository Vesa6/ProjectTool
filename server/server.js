const cors = require('cors');
const express = require('express');
const loginRoute = require('./routes/login');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/login', loginRoute);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});