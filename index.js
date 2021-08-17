const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const authRouter = require('./Routing/auth.router');
const studentRouter = require('./Routing/student.router');
const pageNotFound = require('./Routing/404.router');

// dotenv 
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3051;
// mongoose 
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:${process.env.MONGODB_PORT}/${process.env.DATABASE}`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>{
    console.log(`mongodb connection established `)
}).catch((err)=>{
    console.log(err)
})


app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/auth",authRouter);

app.use("/student",studentRouter);

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));


app.use("*",pageNotFound)

app.use(pageNotFound)

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
