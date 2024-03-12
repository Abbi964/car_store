// configuring dotenv
import 'dotenv/config'

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer} from "@apollo/server/standalone";
import typeDefs from "./graphQL/typeDefs.js";
import resolvers from "./graphQL/resolvers/index.js";

// setting up server 
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen : {port : 4000}
})

console.log('server ready at port ',4000)