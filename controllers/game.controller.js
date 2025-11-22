const connection = require('../config/db')

class GameController { 
  /* share */
  /* share general */
  openShare = (req, res) => {
    const {game} = req.params;
    res.render("share");
  }

  share = (req, res) => {
    res.redirect("/")
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

  // ! NO SÉ CÓMO HACER PARA QUE FUNCIONE CON EL SELECT
  edit = (req, res) => {      
    const {title, rating, platform, release_year, review} = req.body;
    const {game_id, user_id} = req.params;

    let sql = `UPDATE game SET title = ?, rating = ?, platform = ?, release_year = ?, review = ? WHERE game_id = ?`;
    let values = [title, rating, platform, release_year, review, game_id];

    if(req.file != undefined) {
      sql = `UPDATE game SET title = ?, rating = ?, platform = ?, release_year = ?, review, cover = ? WHERE game_id = ?`;
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
 
  /* eliminar juego */

  /* borrado lógico: mandar a borradores */

}
 

module.exports = new GameController();