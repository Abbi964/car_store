// configuring dotenv
import 'dotenv/config'

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer} from "@apollo/server/standalone";
import typeDefs from "./graphQL/typeDefs.js";
import resolvers from "./graphQL/resolvers/index.js";
import mongoose from 'mongoose';

// setting up server 
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen : {port : 4000}
})

mongoose.connect(process.env.MONGO_DB_URL)
    .then(()=>{
        console.log('Connected to Mongo DB')
    })
    .catch((err)=>{
        console.log(err)
    })

console.log('server ready at port ',4000)