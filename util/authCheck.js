
import jwt from 'jsonwebtoken'
import User from '../model/user.js';

const authCheck = async(context) => {
    try{
        // getting token from header
        const token = context.token;
        console.log(token)
          if (token) {
            try {
              const data = jwt.verify(token, process.env.JWT_KEY);
              console.log(data)
              // getting user from db
              let user = await User.findByPk(data.userId)
              
              return new Promise((resolve,reject)=>{
                if(user){
                  resolve(user)
                }
                else{
                  reject('user does not exists')
                }
              })
            } 
            catch (err) {
              throw new Error(err + 'Invalid token');
            }
          }
          else{
              throw new Error("Authentication token not provided");
          }

    }
    catch(err){
        console.log(err);
        return err
    }
};

export default authCheck;