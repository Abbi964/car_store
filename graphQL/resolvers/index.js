import reviewResolver from "./reviews.js";
import userResolvers from "./users.js";
import vehicleResolver from "./vehicles.js";
import appointmentResolver from "./appointments.js";

const resolvers = {
    Query : {
        ...userResolvers.Query,
        ...vehicleResolver.Query,
        ...appointmentResolver.Query
    },
    Vehicle : reviewResolver.Vehicle,
    Mutation : {
        ...userResolvers.Mutation,
        ...vehicleResolver.Mutation,
        ...reviewResolver.Mutation,
        ...appointmentResolver.Mutation
        
    }
}

export default resolvers;