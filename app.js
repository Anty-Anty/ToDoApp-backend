const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const itemsRoutes = require('./routes/items-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require ('./models/http-error');

const app = express();

app.use(bodyParser.json());

//CORS error fix
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', "https://todoapp-frontend-trxp.onrender.com", '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE')
    next();
});

app.use('/api/items', itemsRoutes);
app.use('/api/users', usersRoutes);

app.use((req,res,next)=>{
    return next(new HttpError('Could not find this route.', 404));
});

//error handling middleware, this func will execute if any middleware infront gives an error
app.use((error, req, res, next)=>{
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z6beont.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
// mongoose.connect(`mongodb+srv://toDoAppAdmin:Loop123XYZ@cluster0.z6beont.mongodb.net/toDoApp?retryWrites=true&w=majority&appName=Cluster0`)

.then(()=>{
    app.listen(process.env.PORT || 5000);
})
.catch(err=>{
    console.log(err);
});
