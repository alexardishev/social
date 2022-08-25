const Router = require('express');
const router = new Router();
const brandConroller = require('../controllers/brandController')

router.post('/', brandConroller.create)
router.get('/', brandConroller.getAll)






module.exports = router;