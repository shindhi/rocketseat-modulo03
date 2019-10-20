import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // Ñ existe na base de dados
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // recebe 2 parametros
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // Criptografia da senha
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  // Metodos
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
