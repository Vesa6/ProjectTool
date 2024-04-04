const cors = require('cors');
const express = require('express');
const loginRoute = require('./routes/loginRouter');
const userRoute = require('./routes/userRouter');
const projectRoute = require('./routes/projectRouter');
const tasksRoute = require('./routes/tasksRouter');
const connectToDatabase = require('./database/mongo');
const bodyParser = require('body-parser');
const regRouter = require('./routes/registrationRouter');

function initRoutes(app) {
    app.use('/login', loginRoute);
    app.use('/api/users', userRoute);
    app.use('/api/projects', projectRoute);
    app.use('/api/tasks', tasksRoute);
    app.use('/registration', regRouter)
}


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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
initRoutes(app);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});



