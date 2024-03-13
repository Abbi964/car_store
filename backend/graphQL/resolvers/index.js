import userResolvers from "./users.js";
import vehicleResolver from "./vehicles.js";

const resolvers = {
    Query : {
        ...userResolvers.Query,
        ...vehicleResolver.Query
    },
    Mutation : {
        ...userResolvers.Mutation,
        ...vehicleResolver.Mutation
    }
}

export default resolvers;