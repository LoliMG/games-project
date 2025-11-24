const connection = require('../config/db');

class IndexController {  
  openIndex = (req, res) => {
    let sql = `SELECT user.*, count(game.game_id) AS reviews  
              FROM user
              LEFT JOIN game ON game.user_id = user.user_id
              WHERE game.game_deleted = 0
              GROUP BY user.user_id`;

    connection.query(sql, (err, result) => {
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