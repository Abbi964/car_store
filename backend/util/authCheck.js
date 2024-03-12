
import jwt from 'jsonwebtoken'
import User from '../model/user.js';

const authCheck = async(context) => {
    try{
        // getting token from header
        const token = context.req.headers.authorization;
      
          if (token) {
            try {
              const {userid} = jwt.verify(token, process.env.JWT_KEY);
              // getting user from db
              let user = User.findByPk(userid)

              return {user}
            } 
            catch (err) {
              throw new Error('Invalid token');
            }
          }
          else{
              throw new Error("Authentication token not provided");
          }

    }
    catch(err){
        console.log(err);
        return {err}
    }
};

export default authCheck;