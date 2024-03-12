// configuring dotenv
import 'dotenv/config'

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer} from "@apollo/server/standalone";
import typeDefs from "./graphQL/typeDefs.js";
import resolvers from "./graphQL/resolvers/index.js";
import mongoose from 'mongoose';
import sequelize from './util/database.js';

// importing models
import User from './model/user.js';
import Review from './model/review.js';
import Vehicle from './model/vehicle.js';

// defining relations between models
Vehicle.hasMany(Review);
Review.belongsTo(Vehicle);

User.hasMany(Review);
Review.belongsTo(User);

// setting up server 
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen : {port : 4000}
})

sequelize.sync()
    .then(()=>{
        console.log('Connected to sql database')
        mongoose.connect(process.env.MONGO_DB_URL)
            .then(()=>{
                console.log('Connected to Mongo DB')
            })
            .catch((err)=>{
                console.log(err)
            })
    })
    .catch(err=>console.log(err))

console.log('server ready at port ',4000)