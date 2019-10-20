import Sequelize from 'sequelize';
import mongoose from 'mongoose';

// Models
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

// Array de models
const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // Conexao com o bd e carregar os models
  init() {
    this.connection = new Sequelize(databaseConfig); // Conexao com o bd

    // Manda a conexao para cada model
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  /**
   * localhost == user + password
   * gobarber == name bd
   */
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
