import Sequelize from 'sequelize';
import config from '../config/config.js';

const db = new Sequelize(
  config.DB.database,
  config.DB.username,
  config.DB.password,
  {
    host: config.DB.host,
    dialect: config.DB.dialect,
    port: config.DB.port,
    operatorAliases: false,
    // Configuración de la base de datos
    define: {
      // Crea los campos "createdAt" y "updatedAt"
      timestamps: true
    },
    // // Configuración del pool de conexiones a la base de datos
    // pool: {
    //   // Número máximo de conexiones permitidas en el pool de conexiones a la base de datos vivas
    //   max: 5,
    //   // Número mínimo de conexiones
    //   min: 0,
    //   // Tiempo máximo, en milisegundos, que una conexión puede estar inactiva para marcar error
    //   require: 30000,
    //   // Tiempo máximo, en milisegundos, que una conexión puede estar inactiva y en espera de ser liberada
    //   idle: 10000,
    // },
    // Deshabilita la impresión de las consultas SQL
    logging: false
  }
);

export default db;
