import Sequelize from 'sequelize';

const db = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  define: {
    // Crea los campos "createdAt" y "updatedAt"
    timestamps: true
  },
  // Configuración del pool de conexiones a la base de datos
  pool: {
    // Número máximo de conexiones permitidas en el pool de conexiones a la base de datos vivas
    max: 5,
    // Número mínimo de conexiones
    min: 0,
    // Tiempo máximo, en milisegundos, que una conexión puede estar inactiva para marcar error
    require: 30000,
    // Tiempo máximo, en milisegundos, que una conexión puede estar inactiva y en espera de ser liberada
    idle: 10000
  },
  // Deshabilita la impresión de las consultas SQL
  logging: false,
  // Deshabilita los operadores de alias ya que no se usan
  operatorsAliases: false

});

export default db;
