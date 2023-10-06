const path = require('path');
const Expense=require('./models/expense');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const app = express();
app.use(cors());
const deleteRoutes = require('./routes/delete');
const postRoutes = require('./routes/post');

app.use(bodyParser.json());

app.use('/delete', deleteRoutes);
app.use('/add-expense', postRoutes);
sequelize
    .sync()
    .then((res)=>{
    app.listen(5000);
    })
    .catch((err)=>{
        conssole.log(err);
    });