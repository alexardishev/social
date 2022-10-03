const Router = require('express');
const router = new Router();

const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const formsRouter = require('./formsRouter');


router.use('/user', userRouter)
router.use('/forms', formsRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)







module.exports = router;