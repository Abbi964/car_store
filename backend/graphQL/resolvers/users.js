import bcrypt from "bcrypt";
import User from "../../model/user.js";

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
    
  },
};

export default userResolvers;
