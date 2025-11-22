const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const loadimg = require('../middleware/uploadimg');


router.get("/shareUser/:user_id", gameController.openShareUser);
router.post("/shareUser/:user_id", loadimg('images'), gameController.shareUser);

/* falta */
router.get("/share", gameController.openShare);
router.post("share", loadimg('images'), gameController.share);

/* ME FALLA AL HACER EL ENVÍO DEL FORMULARIO 
  POR EL SELECT */
router.get("/gameEdit/:game_id", gameController.openEditGame);
router.post("/gameEdit/:game_id/:user_id", loadimg('images'), gameController.edit);








module.exports = router;