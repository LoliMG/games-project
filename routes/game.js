const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const loadimg = require('../middleware/uploadimg');

router.get("/allGames", gameController.openAllGames);
router.get("/playstation", gameController.openPlayStation);
router.get("/nintendo", gameController.openNintendo);
router.get("/PC", gameController.openPC);

router.get("/shareUser/:user_id", gameController.openShareUser);
router.post("/shareUser/:user_id", loadimg('images'), gameController.shareUser);

/* falta */
router.get("/share", gameController.openShare);
router.post("share", loadimg('images'), gameController.share);

router.get("/gameEdit/:game_id", gameController.openEditGame);
router.post("/gameEdit/:game_id/:user_id", loadimg('images'), gameController.edit);

// todo NO FUNCIONA :( 
/* router.get("/gameDel", gameController.gameDel);  */
/* router.post("/gameDeleteLogic/:game_id", gameController.gameDeleteLogic); */





module.exports = router;