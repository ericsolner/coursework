module.exports = function (sequelize, DataTypes) {
    const Donut  = sequelize.define("Donut", {
        name: DataTypes.STRING,
        price: DataTypes.DOUBLE
    });

    return Donut;
}