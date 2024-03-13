import bcrypt from "bcrypt";
import User from "../../model/user.js";
import authCheck from "../../util/authCheck.js";
import jwt from 'jsonwebtoken'

const userResolvers = {
  Query: {
    //------------------- getting users-----------------------------------//
    async users() {
      try {
        // getting users from db
        let users = await User.findAll();

        if (users.length > 0) {
          return users;
        } else {
          throw new Error("No user found");
        }
      } catch (err) {
        conosle.log(err);
        throw new Error(err);
      }
    },
    //------------------- getting a user-----------------------------------//
    async user(_,args){
        try{
            // getting user from db
            let user = User.findByPk(args.id)

            if (user){
                return user
            }
            else{
                throw new Error("User does not exists")
            }
        }
        catch(err){
            console.log(err);
            return err
        }
    }
  },

  Mutation: {
    //----------------- Adding a User -------------------------------------//
    async addUser(_, args) {
      try {
            // getting user obj from req
            const userObj = args.user;

            // hasing password
            const hash = bcrypt.hashSync(userObj.password, 10);
            // finding if user exist already if not then creating new
            let [user, created] = await User.findOrCreate({
            where: { email: userObj.email },
            defaults: {
                username: userObj.username,
                email: userObj.email,
                password: hash,
            },
            });

            if (created) {
                return user;
            } 
            else {
            throw new Error('User Already exists');
            }
        } 
        catch (err) {
            console.log(err);
            return err;
        }
    },
    //------------------------ Delete User ----------------------------------//
    async deleteUser(_,args,context){
        try{
            const user = authCheck(context)
            const userId = args.id
    
            if (user || user.id == userId || user.isAdmin){
                // deleting user
                let userToDel = await User.findByPk(userId);

                await userToDel.destroy()
    
                return "user deleted Successfully"
            }
            else if(!user.isAdmin){
                return "Not Authorized : you are not admin"
            }
            
        }
        catch(err){
            console.log(err);
            return err 
        }
    },
    // ------------------------ login --------------------------------------//
    async login(_,args){
        try{
            const email = args.email;
            const password = args.password;

            // getting user from db
            let user = await User.findOne({where : {email : email}})
            
            if (user){
                // checking password
                const match = bcrypt.compareSync(password,user.password)

                if ( match){
                    let accessToken = jwt.sign({userId : user.id},process.env.JWT_KEY)
                    return accessToken
                }
                else{
                    throw new Error("Incorrect Password")
                }
            }
            else{
                throw new Error("Incorrect Email")
            }
        }
        catch(err){
            console.log(err);
            return err
        }
    }
  },
};

export default userResolvers;
