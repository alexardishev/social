const Router = require('express');
const router = new Router();
const deviceConroller = require('../controllers/deviceController')

router.post('/',deviceConroller.create)
router.get('/',deviceConroller.getAll)
router.get('/:id',deviceConroller.getOne)






module.exports = router;