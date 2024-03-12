import { DataTypes } from "sequelize";
import sequelize from "../util/database";

const Vehicle = sequelize.define("Vehicle", {
    id : {type : DataTypes.INTEGER, primaryKey : true, allowNull : false, autoIncrement : true},
    make: { type: DataTypes.STRING, allowNull : false },
    model: { type: DataTypes.STRING, allowNull : false },
    year: { type: DataTypes.INTEGER, allowNull : false },
    price: { type: DataTypes.FLOAT, allowNull : false },
    description: { type: DataTypes.STRING, allowNull : false },
    isUsed: { type: Boolean, allowNull : false },
    isCar: { type: Boolean, allowNull : false },
    milage: { type: DataTypes.FLOAT, allowNull : false },
    fuel_type: { type: DataTypes.STRING, allowNull : false },
    transmission: { type: DataTypes.STRING, allowNull : false },
    body_type: { type: DataTypes.STRING, allowNull : false },
    engine_size: { type: DataTypes.INTEGER, allowNull : false },
    color: { type: DataTypes.STRING, allowNull : false },
    interior_features: { type: DataTypes.ARRAY, allowNull : false },
    images: { type: DataTypes.ARRAY, allowNull : false },
    availability: { type: DataTypes.INTEGER, allowNull : false },
});

export default Vehicle;