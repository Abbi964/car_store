const typeDefs = `#graphql
    type Vehicle {
        id : ID!
        make : String!
        model : String!
        year : Int!
        price : Float!
        description : String!
        isUsed : Boolean!
        milage : Float!
        fuel_type : String!
        transmission : String!
        body_type : String!
        engine_size : Int!
        color : String!
        interior_features : [String!]!
        images : [String!]!
        availability : Int!
        reviews : [Review]!
    }
    type User {
        id : ID!
        username : String!
        email : String!
        password : String!
        isAdmin : Boolean!
    }
    type Review{
        id : ID!
        username : String!
        title : String!
        review : String!
        rating : Float!
    }
    type Appointment {
        id : ID!
        name : String!
        email : String!
        purpose : String!
        date : String!
        time : Float!
        phone : Int! 
    }
    type Query {
        vehicles(filterObj : vehicleFilterInput!) : [Vehicle]
        vehicle(id : ID!)  : Vehicle
        users : [User]
        user(id : ID!) : User
        reviews : [Review]
        review(id : ID!)  : Review
        appointments : [Appointment]
        appointment(id : ID!)  : Appointment
        getSlots(date : String!) : [Int]
    }
    type Mutation {
        addVehicle(vehicle : addVehicleInput!) : Vehicle
        deleteVehicle(id : ID!) : String
        addUser(user : addUserInput!) : User
        deleteUser(id : ID!) : String
        login(email : String!, password : String!) : String!
        addReview(review : addReviewInput!,vehicleId : ID!) : Review
        deleteReview(id : ID!) : String
        addAppointment(appointment : addAppointmentInput!) : Appointment
    }
    input addVehicleInput{
        make : String!
        model : String!
        year : Int!
        price : Float!
        description : String!
        isUsed : Boolean!
        milage : Float!
        fuel_type : String!
        transmission : String!
        body_type : String!
        engine_size : Int!
        color : String!
        interior_features : [String!]!
        images : [String!]!
        availability : Int!
    }
    input addUserInput{
        username : String!
        email : String!
        password : String!
    }
    input addReviewInput{
        title : String!
        review : String!
        rating : Float!
    }
    input addAppointmentInput{
        name : String!
        email : String!
        purpose : String!
        date : String!
        time : Float!
        phone : Int! 
    }
    input vehicleFilterInput{
        make : String!
        model : String!
        price : String!
        milage : String!
        fuel_type : String!
        transmission : String!
        body_type : String!
        engine_size : String!
        color : String!
        availability : String!
    }
`

export default typeDefs;