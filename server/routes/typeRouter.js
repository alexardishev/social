const Router = require('express');
const router = new Router();
const typeConroller = require('../controllers/typeController')

router.post('/create', typeConroller.create)
router.get('/', typeConroller.getAll)






module.exports = router;