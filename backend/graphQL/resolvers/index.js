import reviewResolver from "./reviews.js";
import userResolvers from "./users.js";
import vehicleResolver from "./vehicles.js";

const resolvers = {
    Query : {
        ...userResolvers.Query,
        ...vehicleResolver.Query
    },
    Vehicle : reviewResolver.Vehicle,
    Mutation : {
        ...userResolvers.Mutation,
        ...vehicleResolver.Mutation,
        ...reviewResolver.Mutation
    }
}

export default resolvers;