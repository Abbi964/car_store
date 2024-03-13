import Vehicle from "../../model/vehicle.js";
import { Op, where } from "sequelize";
import authCheck from "../../util/authCheck.js";

const vehicleResolver = {
    Query : {
        //------------------- getting vehicles---------------------------------------//
        async vehicles(_,args){
            try{
                let filterObj = args.filterObj;
        
                // now making the where clause to aggrigate
                let whereClause = {};
        
                for ( let key in filterObj){
                    if (filterObj[key] !== 'All'){
                        if (!isNaN(filterObj[key][0]) ){  // first ele is a number meaning its a range
                            // spliting 
                            let min = +filterObj[key].split('-')[0]
                            let max = +filterObj[key].split('-')[1]
                            // Adding filter to whereClause
                            whereClause[key] = { [Op.between]: [min, max] };
                        }
                        else{ // it is not a range
                            // adding filter in whereCluase
                            whereClause[key] = filterObj[key];
                        }
                    }
                }
                console.log("whereCluse--->",whereClause)
                // Finding vehicles based on the constructed whereClause
                const vehicles = await Vehicle.findAll({ where: whereClause });
                // first convering images and interier_features into arrays
                const vehiclesFinal = vehicles.map((vehicle)=>{
                    vehicle.images = vehicle.images.split(',')
                    vehicle.interior_features = vehicle.interior_features.split(',')
                    return vehicle
                }) 
                return vehiclesFinal
            }
            catch(err){
                console.log(err)
                return []
            }
        },
        //--------------------------- get a vehicle -----------------------------------//
        async vehicle(_,args){
            try{
                const vehicleId = args.id;

                // finding vehicle
                let vehicle = await Vehicle.findByPk(vehicleId);

                // first convering images and interier_features into arrays
                vehicle.images = vehicle.images.split(',')
                vehicle.interior_features = vehicle.interior_features.split(',')

                return vehicle
            }
            catch(err){
                console.log(err);
                return err
            }
        }
    },
    Mutation : {
        async addVehicle(_,args,context){
            try{
                const user = await authCheck(context)
                console.log(user)
                const vehicleObj = args.vehicle

                if (user.isAdmin){
                    // first converting interiarFeatures and images into string
                    vehicleObj.images = vehicleObj.images.join(',')
                    vehicleObj.interior_features = vehicleObj.interior_features.join(',')
                    // creating a new vehicle

                    let vehicle = await Vehicle.create(vehicleObj)

                    return vehicle
                }
                else{
                    throw new Error("Unautherized : User is not Admin")
                }
            }
            catch(err){
                console.log(err);
                return err
            }
        },
        async deleteVehicle(_,args,context){
            try{
                const user = await authCheck(context);
                const vehicleId = args.id;

                if ( user.isAdmin){
                    // finding the vehicle and deleting
                    let vehicle = await Vehicle.findByPk(vehicleId)
                    await vehicle.destroy()

                    return "vehicle deleted successfully"
                }   
                else{
                    return "You are not admin"
                }
            }
            catch(err){
                console.log(err);
                return err
            }
        }
    }
}

export default vehicleResolver;