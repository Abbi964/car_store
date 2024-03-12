const typeDefs = `#graphql
    type Vehicle {
        id : ID!
        make : String!
        model : String!
        year : Int!
        price : Float!
        description : String!
        isUsed : Boolean!
        isCar : Boolean!
        milage : Float!
        fuel_type : String!
        transmission : String!
        body_type : String!
        engine_size : Int!
        color : String!
        interior_features : [String!]!
        images : String!
        availability : Int!
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
        title : String!
        review : String!
        rating : Float!
    }
    type Appointment {
        name : String!
        email : String!
        purpose : String!
        date : String!
        time : Float!
        phone : Int! 
    }
    type Query {
        sayHi : String!
    }
`

export default typeDefs;