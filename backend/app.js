const express = require('express');
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schema/schema');
const dotenv = require('dotenv')
const connectDb = require('./Db/Database');
//load db credentials from .env 

dotenv.config({ path: __dirname + '/.env'});

const db = `mongodb+srv://achar:${process.env.DB_PASSWORD}@cluster0.0vjei.mongodb.net/graphql-db?retryWrites=true&w=majority`;

connectDb(db);

const app = express()

//use this graphql middleware.
app.use('/graphql', cors(), graphqlHTTP({
    //config object goes here.
    schema,
    graphiql: true
}))

app.listen(5000, () =>{
    console.log( ` --------- App listening on port 5000 -------`)
})