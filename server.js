const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path=require('path')
const cors =require('cors');
const jwt =require('jsonwebtoken')
require('dotenv').config({
    path: 'variables.env'
});
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const {
    graphiqlExpress,
    graphqlExpress
} = require('apollo-server-express');
const {
    makeExecutableSchema
} = require('graphql-tools');
const {
    typeDefs
} = require('./schema');
const {
    resolvers
} = require('./resolvers');
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
mongoose.set('useCreateIndex', true);
mongoose
    .connect(process.env.MONGO_URI, {
        auth: {
            user: 'root',
            password: 'root@123'
        }
    })
    .then(() => {
      //  console.log('DB connectd')
    })
    .catch(err => {
        console.error(err, 'error.. in db connect');
    })
const app = express();

// const corsOption={
//     origin:'http://localhost:3000',
//     credentials:true
// }
app.use(cors("*"));
app.use(async (req,res,next)=>{
    const token =req.headers['authorization'];
   // console.log(token,typeof token);
    if(token!=="null"){
        try{
            const currentUser = await jwt.verify(token,process.env.SECRET);
            //console.log(currentUser)
            req.currentUser =currentUser;
        }catch(err){
            console.error(err);
        }
    }
    next();
});
// app.use('/graphiql', graphiqlExpress({
//     endpointURL: '/graphql'
// }));
app.use('/graphql', 
bodyParser.json(), 
graphqlExpress(({currentUser})=>{
    return ({
        schema,
        context: {
            Recipe,
            User,
            currentUser
        }
    });
})

);
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
   // console.log(`Server Listening on ` + PORT);
})