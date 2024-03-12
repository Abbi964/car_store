import { DataTypes } from "sequelize";
import sequelize from "../util/database";

const Review = sequelize.define('Review',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false
    },
    title : DataTypes.STRING,
    review : DataTypes.STRING,
    rating : {
        type : DataTypes.FLOAT,
        allowNull : false
    }
})

export default Review;