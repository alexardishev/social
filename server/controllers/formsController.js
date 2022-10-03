const ApiError = require('../error/ApiError');
const uuid = require('uuid')
const {User, Basket} = require('../models/models')
const jwt = require('jsonwebtoken');


class FormsControllers {
    async upadatePersonal(req,res,next) {
        try {
            let {firstName, lastName, middleName, sex, email} = req.body
            if (!email) {
                return next(ApiError.badRequest('Не авторизован'))
            }

            if (!firstName || !lastName || !middleName || !sex) {
                return next(ApiError.badRequest('Не заполнены обязательные поля'))
            }

            email = email.toLowerCase();
            const user = await User.findOne({where: {email}});

           await user.update({
            firstName,
            lastName,
            middleName,
            sex,
            isFullData: true
           })

           await user.save();
           

           
            return res.json([{code:1, update: 'Анкета заполнена'}]);
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new FormsControllers