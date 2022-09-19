const ApiError = require('../error/ApiError');
const {User} = require('../models/models')

class UserService {



    
    async activate(activationLink) {
        const user = await User.findOne({where:{activationLink: activationLink}})
        if (!user) {
            throw ApiError.badRequest('Неккоректная ссылка активации')
        }
        if(user.dataValues.isActivate) {
            throw ApiError.badRequest('Вы уже активировали свою учетную запись')
        }
        await User.update({ isActivate: true}, {
            where: {
                activationLink: activationLink
            }
          });
        await user.save();
    }

    async resetPassword(resetLink) {
        const user = await User.findOne({where:{resetLink: resetLink}})
        if (!user) {
            throw ApiError.badRequest('Неккоректная ссылка сброса пароля')
        }
    }
}

module.exports = new UserService();