const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const {User, Basket, FriendsList} = require('../models/models')
const sequelize = require('../db')
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const mailService = require('../service/mailService');
const validate = require('../validation/validation')
const userService = require('../service/userService')

const generateJwt = (id, email, role, activationLink,isFullData) => {
    return jwt.sign(
        {id, email, role, activationLink,isFullData},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController {
    async registration(req, res, next) {
            try {
                let {email, password, role} = req.body
                if (!email || !password) {
                    return next(ApiError.badRequest('Неккоректный email или пароль'))
                }
    
                email = email.toLowerCase();
                const check = await User.findOne({where: {email}});
    
                if(check) {
                 return next(ApiError.badRequest({msg:"Пользователь с таким email уже зарегистрирован!", code: 2}))
                }
    
                if(!validate.validate(password)) {
                    return next(ApiError.badRequest(validate.validate(password, {list: true})))
                }
    
                
               const activationLink = await uuid.v4();
               const hashPassword = await bcrypt.hash(password, 5)
               await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
    
               
               const user = await User.create({
                email,
                role,
                password: hashPassword,
                activationLink
               })
    
               const basket = await Basket.create({userId: user.id})
               const jwtToken = generateJwt(user.id, email, role, user.activationLink)
               
                return res.json([jwtToken, {code:1, registration: 'Пользователь зарегистрирован!'}]);
            } catch(e) {
                console.log(e);
            }
           

    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async reset(req, res, next) {
        try {
            const {email} = req.body

            const user = await User.findOne({where: {email}})
            const resetLink = await uuid.v4();

            if(!user) {
                return next(ApiError.internal(`Пользователь с email  ${email} не зарегистрирован!`))
            }
            await user.set({
                resetLink: resetLink,
            })
            await mailService.sendResetPassword(email, `${process.env.API_URL}/api/user/newpass/${resetLink}`);
            await user.save();
            return res.json({newpass: 'Done'})

        } catch(e) {
            next(e)
        }
        
    }

    async newpass(req, res, next) {
        try {
            return res.redirect(process.env.RESET_URL);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body


        const user = await User.findOne({where: {email}})

        console.log(user)
        if(!user) {
            return next(ApiError.internal(`Пользователь с email  ${email} не зарегистрирован!`))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            await user.attempts < user.maxAttempts ? user.attempts ++ : user.attempts;
            await user.save()
            if(user.attempts == user.maxAttempts) {
                return next(ApiError.internal(`Учетная запись заблокирована. Необходимо вернутся на главную страницу и сбросить пароль`))
            }
            return next(ApiError.internal(`Неверный пароль. Осталось попыток ${user.maxAttempts - user.attempts}`))
        }

        

        if(!user.isActivate) {
            return next(ApiError.internal(`Необходимо активировать учетную запись`))
        }
        console.log(user.isFullData)
        const token = generateJwt(user.id, user.email, user.role, user.activationLink, user.isFullData)
        await res.set('Authorization' , `Bearer ${token}`);
        return res.json({token})
    }

    async getOne(req, res, next) {
        const {email} = req.params
        const user = await User.findOne({
            where: {email}
        })
        if(!user){
            const noUser = {error: 'not User in DB'}
            return res.json(noUser)
        }
        return res.json(user);
    }
    
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.activationLink, req.user.isFullData)
        await res.set('Authorization' , `Bearer ${token}`);
        return res.json({token})
    }
    // Отдает лист друзей, которых у меня нету в друзьях. И которых я могу добавить.
    async getFriendListToAdd(req, res, next) {
            const {id} = req.params
          
            const users = await User.findAll({
                attributes: ['id', 'firstName', 'lastName', 'middleName', 'sex',],
                    where: {
                        isActivate: true,
                        isFullData: true,
                        id: {
                            [Op.notIn]: sequelize.literal( `(SELECT "friend_id" 
                                FROM public.friends_lists fr
                                    WHERE fr."userId" = ${id}
                                AND fr."isAproove" = ${true}
                                )`),
                            [Op.notIn]: sequelize.literal( `(SELECT "userId" 
                                FROM public.friends_lists fr
                                    WHERE fr."friend_id" = ${id}
                                AND fr."isAproove" = ${true}
                                )`),
                            [Op.ne]: `${id}`
                        }
                    }
            });
            if(!users) {
                return next(ApiError.internal(`Нет друзей`))
            }
    
            return res.json(users)
        
        
    }

    async aprooveStatus(req,res,next) {
        const aproove = await FriendsList.findAll({
            attributes: ['friend_id', 'isAproove'],
        })

        return res.json(aproove)
    }

    async getFriendList(req, res, next) {
        const {id} = req.params
      
        const users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'middleName', 'sex'],
                where: {
                    isActivate: true,
                    isFullData: true,
                    id: {
                        [Op.or]: [{[Op.in]: sequelize.literal( `(SELECT "friend_id" 
                        FROM public.friends_lists fr
                            WHERE fr."userId" = ${id}
                        AND fr."isAproove" = ${true})`)}, {[Op.in]: sequelize.literal( `(SELECT "userId" 
                        FROM public.friends_lists fr
                            WHERE fr."friend_id" = ${id}
                        AND fr."isAproove" = ${true}
                        )`)}],                     
                    
                  
                    
                    
                }


                    }
                })

        if(!users) {
            return next(ApiError.internal(`Нет друзей`))
        }

        return res.json(users)
    
    
}

    async addFriends(req, res, next) {
        const {id, friendId} = req.body
        const friendShip = await  FriendsList.findOne({
            where: {
                userId: id,
                friend_id: friendId
            }
        })

        console.log(friendShip)
        try {

            if(friendShip) {
                return next(ApiError.badRequest('Такой друг уже есть'));
            }

            if (!id && !friendId) {
                return next(ApiError.badRequest('Идентификатор не существует'));
            }

            const friendRelation = await FriendsList.create({
                    friend_id: friendId,
                    userId: id,
                    isAproove: false,
                })
                return res.json(friendRelation);
        } catch(e) {
            next(e);
        } 

    }

    async getNeedAprooveFriends (req, res, next) {
            const {friendId} = req.params;

            if(!friendId) {
                return next(ApiError.badRequest('Неверные данные'))
            }


            const users = await User.findAll({
                attributes: ['id', 'firstName', 'lastName', 'middleName', 'sex',],
                    where: {
                        isActivate: true,
                        isFullData: true,
                        id: {
                            [Op.in]: sequelize.literal( `(SELECT fr."userId" 
                                FROM public.friends_lists fr
                                    WHERE fr."friend_id" = ${friendId}
                                AND fr."isAproove" = ${false})`)
                        }
                    }
            });

            if(!users) {
                return next(ApiError.badRequest('Не существует такого'))
            }

            return res.json(users)
    }


}


module.exports = new UserController()