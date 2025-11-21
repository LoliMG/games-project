const connection = require('../config/db');

class IndexController {  
  openIndex = (req, res) => {
    let sql = `SELECT * FROM user`;
    let games = `SELECT count(game_id) FROM game
                  JOIN user ON game.user_id = user.user_id`;
    /* intento de conectar para que salga el número */
    connection.query(sql, games, (err, result) => {
      if(err){
        throw err;
      }
      else{
        res.render('index', {user: result});
      }
    })    
  }



  
}

module.exports = new IndexController();