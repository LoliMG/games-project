const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const loadimg = require('../middleware/uploadimg')


router.get('/userX/:id', userController.openUser);

router.get('/register', userController.openRegister);
router.post('/register', loadimg('/images/users'), userController.register);

router.get("/login", userController.openLogin);
router.post("login", userController.login);

router.get("/userEdit", userController.openEdit);
router.post("/userEdit", loadimg('/images/users'), userController.editProfile);


module.exports = router;
