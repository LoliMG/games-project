const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const loadimg = require('../middleware/uploadimg');

router.get("/allGames", gameController.openAllGames);
router.get("/playstation", gameController.openPlayStation);
router.get("/nintendo", gameController.openNintendo);
router.get("/PC", gameController.openPC);

router.get("/shareUser/:user_id", gameController.openShareUser);
router.post("/shareUser/:user_id", loadimg('games'), gameController.shareUser);

/* falta */
router.get("/share", gameController.openShare);
router.post("/share", loadimg('games'), gameController.share);

router.get("/gameEdit/:game_id", gameController.openEditGame);
router.post("/gameEdit/:game_id/:user_id", loadimg('games'), gameController.edit);



// ? NO FUNCIONA :( 
router.get("/gameDel/:game_id/:user_id", gameController.gameDel);  
router.get("/gameDeleteLogic/:game_id/:user_id", gameController.gameDeleteLogic); 
router.get("/gamePublishDraft/:game_id/:user_id", gameController.gamePublishDraft); 




module.exports = router;