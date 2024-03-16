const cors = require('cors');
const express = require('express');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/userController')
const connectToDatabase = require('./database/mongo');
const bodyParser = require('body-parser')


const app = express();
connectToDatabase()
    .then(db => {
        // Pass the database connection to other modules if needed
        app.locals.db = db;
        console.log('MongoDB connection available in the application');
    })
    .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use('/login', loginRoute);
app.use('/api/users', userRoute);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});



