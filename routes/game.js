const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const loadimg = require('../middleware/uploadimg');


router.get("/share", gameController.openShare);
router.post("share", loadimg('games'), gameController.share);

/* PARA LO ÚLTIMO... */
router.get("/shareUser/:game_id", gameController.openShareUser);
router.post("shareUser/:game_id", loadimg('games'), gameController.shareUser);

/* ME FALLA AL HACER EL ENVÍO DEL FORMULARIO */
router.get("/gameEdit/:game_id", gameController.openEdit);
router.post("gameEdit/:game_id/:user_id", loadimg('games'), gameController.edit);








module.exports = router;