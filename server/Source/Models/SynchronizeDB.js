const { sequelize } = require('./Index');

// Definir una función asincrónica para inicializar la base de datos
const SynchronizeDB = async () => {
  try {
    await sequelize.authenticate({logging:false}) // Verifica la conexión a la base de datos
    // Sincroniza los modelos con la base de datos y crea las tablas si no existen
    await sequelize.sync({ 
      force: true,
      logging:false
    }) // Cambia a true para eliminar y recrear las tablas en cada ejecución

    console.log('Database synchronized successfully.')
  }
  catch (error) {
    console.error('Error synchronizing the database:', error)
  }
}

module.exports = SynchronizeDB;
