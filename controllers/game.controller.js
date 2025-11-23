const connection = require('../config/db')

class GameController { 
  /* share */
  /* share general */
  openShare = (req, res) => {
    let sql = 'SELECT user_id, name FROM user WHERE user_deleted = 0';
    
    connection.query(sql, (err, result) => {
      if(err){
        throw err;
      }
      else {
        res.render("share", {user: result, message: ""});
      }
    })    
  }

  share = (req, res) => {
    const {user_id, title, rating, platform, release_year, review} = req.body;

    if (!user_id||!title||!rating||!platform||!release_year||!review||!req.body) {
      let sql = 'SELECT user_id, name FROM user WHERE user_deleted = 0';
      connection.query(sql, (err, result) => {
        if(err) {
          throw err;
        }
        else {
          res.render("share", {user: result, message: "Rellena todos los campos."})
        }      
      })
    }
    else {
      let sql = `INSERT INTO game (user_id, title, rating, platform, release_year, review, cover)
                  VALUES (?,?,?,?,?,?,?)`;
      let values = [user_id, title, rating, platform, release_year, review, req.file.filename];
      connection.query(sql, values, (err, result) => {
        if(err) {
          throw err;
        }
        else {
          res.redirect(`/user/userX/${user_id}`);
        } 
      })
    }
  }

  /* share from profile */
  openShareUser = (req, res) => {
    const {user_id} = req.params;
    res.render("shareUser", {user_id: user_id, message: ""});
  }

  shareUser = (req, res) => {
    const {user_id} = req.params;
    const {title, rating, platform, release_year, review} = req.body;

    console.log(req.params);
    console.log(req.body);

    if(!title||!rating||!platform||!release_year||!review) {
      res.render("shareUser", {message: "¡Rellene todos los campos!", user_id: user_id})
    }
    else if (!req.file) {
      res.render("shareUser", {message: "¡Inserte una imagen!", user_id: user_id})
    }
    else { //to db 
      let sql = `INSERT INTO game (user_id, title, rating, platform, release_year, review, cover) VALUES (?,?,?,?,?,?,?)`;
      let values = [user_id, title, rating, platform, release_year, review, req.file.filename];

      connection.query(sql, values, (err, result) => {
        if(err){
          throw err;
        }
        else {
          res.redirect(`/user/userX/${user_id}`)
        }
      })
    }    
  }

  /* edit */
  openEditGame = (req, res) => {
    let {game_id} = req.params;    
    let sql = `SELECT * FROM game WHERE game_id = ?`;
    let values = [game_id];

    connection.query(sql, values, (err, result) => {
      if(err){
        throw err;
      }
      else {
        res.render("gameEdit", {gameToEdit: result[0], message: ""});
      }
    })          
  }     

  edit = (req, res) => {      
    const {title, rating, platform, release_year, review} = req.body;
    const {game_id, user_id} = req.params;

    let sql = `UPDATE game SET title = ?, rating = ?, platform = ?, release_year = ?, review = ? WHERE game_id = ?`;
    let values = [title, rating, platform, release_year, review, game_id];

    if(req.file != undefined) {
      sql = `UPDATE game SET title = ?, rating = ?, platform = ?, release_year = ?, review = ?, cover = ? WHERE game_id = ?`;
      values = [title, rating, platform, release_year, review, req.file.filename, game_id];
    }    

    connection.query(sql, values, (err, result) => {
      if(err){
        throw err;
      }
      else {
        res.redirect(`/user/userX/${user_id}`)
      }
    })
  }
 

  // ALL THE GAMES AND EACH VIEW FOR PLATFORM 
  openAllGames = (req, res) => {
    let sql = `SELECT game.*, user.* FROM game 
                      LEFT JOIN user ON game.user_id = user.user_id
                WHERE game_deleted = 0
                ORDER BY title`;

    connection.query(sql, (err, result) => {
      // TODO: NO CONSIGO QUE FUNCIONE LO DE VER EL NOMBRE DE USUARIO :( 
      // * PERO SI PULSAS, SÍ TE LLEVA
      if(err){
       throw err;
      }
      else {     
        const {name} = req.body;
        const {game_id} = req.params;

        let sql2 = `SELECT * FROM game WHERE user_id = ?`;     
        let value = {game_id};

        connection.query(sql2, value, (err2, result2) => { 
          if(err2){
            throw err2;
          }
          else {
            res.render("allGames", {game: result, user: result2}); 
          }
        })
      } 
    })
  } 

  openPlayStation = (req, res) => {
    let sql = `SELECT game.*, user.* FROM game 
                      LEFT JOIN user ON game.user_id = user.user_id
                WHERE game_deleted = 0
                AND game.platform = "PlayStation"
                ORDER BY title`;

  connection.query(sql, (err, result) => {
    // TODO: NO CONSIGO QUE FUNCIONE LO DE VER EL NOMBRE DE USUARIO :( 
    // * PERO SI PULSAS, SÍ TE LLEVA
    if(err){
      throw err;
    }
    else {     
      const {name} = req.body;
      const {game_id} = req.params;

      let sql2 = `SELECT * FROM game WHERE user_id = ?`;     
      let value = {game_id};

      connection.query(sql2, value, (err2, result2) => { 
        if(err2){
          throw err2;
        }
        else {
          res.render("playstation", {game: result, user: result2}); 
        }
      })
    } 
  })
  }

  openPC = (req, res) => {
    let sql = `SELECT game.*, user.* FROM game 
                      LEFT JOIN user ON game.user_id = user.user_id
                WHERE game_deleted = 0
                AND game.platform = "PC"
                ORDER BY title`;

    connection.query(sql, (err, result) => {
      // TODO: NO CONSIGO QUE FUNCIONE LO DE VER EL NOMBRE DE USUARIO :( 
      // * PERO SI PULSAS, SÍ TE LLEVA
      if(err){
       throw err;
      }
      else {     
        const {name} = req.body;
        const {game_id} = req.params;

        let sql2 = `SELECT * FROM game WHERE user_id = ?`;     
        let value = {game_id};

        connection.query(sql2, value, (err2, result2) => { 
          if(err2){
            throw err2;
          }
          else {
            res.render("PC", {game: result, user: result2}); 
          }
        })
      } 
    })
  }

  openNintendo = (req, res) => {
    let sql = `SELECT game.*, user.* FROM game 
                      LEFT JOIN user ON game.user_id = user.user_id
                WHERE game_deleted = 0
                AND game.platform = "nintendo"
                ORDER BY title`;

    connection.query(sql, (err, result) => {
      // TODO: NO CONSIGO QUE FUNCIONE LO DE VER EL NOMBRE DE USUARIO :( 
      // * PERO SI PULSAS, SÍ TE LLEVA
      if(err){
       throw err;
      }
      else {     
        const {name} = req.body;
        const {game_id} = req.params;

        let sql2 = `SELECT * FROM game WHERE user_id = ?`;     
        let value = {game_id};

        connection.query(sql2, value, (err2, result2) => { 
          if(err2){
            throw err2;
          }
          else {
            res.render("nintendo", {game: result, user: result2}); 
          }
        })
      } 
    })
  }

  // delete from 
  gameDel = (req, res) => {       
    const {game_id, user_id} = req.params;
    let sql = `DELETE FROM game WHERE game_id = ?`;

    connection.query(sql, [game_id], (err, result) => {
      if(err){
        throw err;
      }
      else {
        res.redirect(`/user/userX/${user_id}`)
      }
    })    
  }    
    

  /* delete logic */
  gameDeleteLogic = (req, res) => {
    const {game_id, user_id} = req.params;
    let sql = `UPDATE game SET game_deleted = 1`;

    connection.query(sql, [game_id], (err, result) => {
      if(err){
        throw err;
      }
      else {
        res.redirect(`/user/userX/${user_id}`)
      }
    })
  }

  /* publish draft */
  gamePublishDraft = (req, res) => {
    const {game_id, user_id} = req.params;
    let sql = `UPDATE game SET game_deleted = 0`;

    connection.query(sql, [game_id], (err, result) => {
      if(err){
        throw err;
      }
      else {
        res.redirect(`/user/userX/${user_id}`)
      }
    })
  }


  

}
 

module.exports = new GameController();