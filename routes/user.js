const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const loadimg = require('../middleware/uploadimg')


router.get('/userX/:id', userController.openUser);
router.get('/draft/:id', userController.openDraft);

router.get('/register', userController.openRegister);
router.post('/register', loadimg('users'), userController.register);

/* falta */
router.get("/login", userController.openLogin);
router.post("login", userController.login);

/* falta */
router.get("/userEdit/:user_id", userController.openEdit);
router.post("/userEdit/:user_id", loadimg('users'), userController.editProfile);


module.exports = router;
