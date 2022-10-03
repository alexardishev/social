const Router = require('express');
const router = new Router();
const formsController = require('../controllers/formsController')

router.post('/upadatePersonal', formsController.upadatePersonal)






module.exports = router;