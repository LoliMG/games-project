const connection = require('../config/db')

class GameController { 
  /* share */
  /* share general */
  openShare = (req, res) => {
    res.render("share");
  }

  share = (req, res) => {
    res.redirect("/")
  }

  /* share from profile */
  openShareUser = (req, res) => {
    res.render("shareUser");
  }

  shareUser = (req, res) => {
    res.redirect("/")
  }

  /* edit */
  openEdit = (req, res) => {
    let {game_id} = req.params;    
    let sql = `SELECT * FROM game WHERE game_id = ?`;
    let values = [game_id];

    connection.query(sql, values, (err, result) => {
      if(err){
        throw err;
      }
      else {
        res.render("gameEdit", {gameToEdit: result[0]});
      }
    })          
  }     
  
  edit = (req, res) => {
    const {title, rating, platform, release_year, review} = req.body;
    const {game_id, user_id} = req.params;

    let sql = `UPDATE game SET title = ?, rating = ?, platform = ?, release_year = ?, review = ? WHERE game_id = ?`;
    let values = [game_id, title, rating, platform, release_year, review];

    if(req.file != undefined) {
      sql = `UPDATE game SET title = ?, rating = ?, platform = ?, release_year = ?, review, cover = ? WHERE game_id = ?`;
      values = [game_id, title, rating, platform, release_year, review, req.file.filename];
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