const ApiError = require('../error/ApiError');
const {User} = require('../models/models')

class UserService {



    
    async activate(activationLink) {
        const user = await User.findOne({where:{activationLink: activationLink}})
        console.log(user);
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
}

module.exports = new UserService();