const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/reset', userController.reset);
router.post('/friendList/add', userController.addFriends);

router.get('/friendList/aprooveStatus', userController.aprooveStatus);
router.get('/:email', userController.getOne);
router.get('/friendList/:id', userController.getFriendListToAdd);
router.get('/friendListAproove/:id', userController.getFriendList);
router.get('/friendListNeedAproove/:friendId', userController.getNeedAprooveFriends);
router.get('/auth', authMiddleware, userController.check);
router.get('/activate/:link', userController.activate);
router.get('/newpass', userController.newpass);








module.exports = router;