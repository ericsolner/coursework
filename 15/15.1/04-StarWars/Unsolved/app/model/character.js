 var allcharacters = sequelize.define("places", {
          routeName: {
              type: Sequelize.STRING,
          },
          name: {
              type: Sequelize.STRING
          },
          role: {
              type: Sequelize.STRING
          },
          age: {
            type: Sequelize.DATE
          }
          forcePoints: {
            type: Sequelize.INTEGER
          }
      }, {
          timestamps: false
      });
      
      //syncs with the database
      starwars.sync()