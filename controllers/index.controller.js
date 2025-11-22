const connection = require('../config/db');

class IndexController {  
  openIndex = (req, res) => {
    let sql = `SELECT * FROM user`;

    connection.query(sql, (err, result) => {
      if(err){
        throw err;
      }
      else{         
        res.render('index', {user: result});
      }
    })
  }             
 
  /*    const {game_id, user_id} = req.params;   
        let sql2 = `SELECT count(game_id) AS reviews 
                    FROM game
                      JOIN user ON game.user_id = user.user_id
                    WHERE user.user_id = ?`;
          ? let value = {reviews here? how?} = req.body;    
            TODO ¿Cómo hacer esto para que pueda poner la cuenta de los juegos que tiene?        
            
        connection.query (sql2, (err2, result2) => {
          if(err2){
            throw err2;
          }
          else {
             TODO ¿Esto iría dentro del else de la primera connection.query?
          } */
      
      
        
  }



  


module.exports = new IndexController();