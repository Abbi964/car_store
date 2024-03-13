import { Op } from "sequelize";
import Review from "../../model/review.js";
import authCheck from "../../util/authCheck.js";

const reviewResolver = {
    Vehicle : {
        //-------------------------- Getting Reviews for a Vehicle  --------------------------//
        async reviews(parent,args,){
            try{
                const vehicleId = parent.id;

                // getting reviews from db
                const reviews = await parent.getReviews()

                return reviews;
            }
            catch(err){
                console.log(err)
                return [err]
            }
        }
    },
    Mutation : {
        //--------------------- Adding a review ---------------------------//
        async addReview(_,args,context){
            try{
                const user = await authCheck(context)
                const vehicleId = args.vehicleId;
                const reviewObj = args.review;
                
                // adding a review
                let review = await Review.create({
                    ...reviewObj,
                    username : user.username,
                    UserId : user.id,
                    VehicleId : vehicleId,
                })

                return review
            }
            catch(err){
                console.log(err);
                return err
            }
        },
        //----------------------------- Deleting a Review ---------------------------//
        async deleteReview(_,args,context){
            try{
                const user = await authCheck(context);
                const reviewId = args.id;

                // finding review and deleting
                let review = await Review.findOne({
                    where : {[Op.and] : [
                        {id : reviewId},
                        {UserId : user.id}
                    ]}
                })

                return review
            }
            catch(err){
                console.log(err);
                return err
            }
        }
    }
}

export default reviewResolver;