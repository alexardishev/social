const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const {User, Basket} = require('../models/models')
const jwt = require('jsonwebtoken');
const mailService = require('../service/mailService');
const validate = require('../validation/validation')
const userService = require('../service/userService')

const generateJwt = (id, email, role, activationLink) => {
    return jwt.sign(
        {id, email, role, activationLink},
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

        const token = generateJwt(user.id, user.email, user.role, user.activationLink)
        console.log(jwt.verify(token, process.env.SECRET_KEY))
        await res.set('Authorization' , `Bearer ${token}`);
        return res.json({token})
    }

    
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        await res.set('Authorization' , `Bearer ${token}`);
        return res.json({token})
    }
}


module.exports = new UserController()