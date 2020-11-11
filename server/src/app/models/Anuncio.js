import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Anuncio extends Model {
    static init(sequelize) {
        super.init({
            titulo: Sequelize.STRING,
            categoria: Sequelize.STRING,
            descricao: Sequelize.STRING,
            valor: Sequelize.FLOAT,
        },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default Anuncio;