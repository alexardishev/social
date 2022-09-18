const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/reset', userController.reset);
router.get('/auth', authMiddleware, userController.check);
router.get('/activate/:link', userController.activate);
router.get('/newpass', userController.newpass);








module.exports = router;