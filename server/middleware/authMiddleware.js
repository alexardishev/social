const jwt = require('jsonwebtoken')
const {userOfflineStatus} = require('../service/eventService')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        const email = req.headers.useremail
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        // console.log(decoded)
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};