const connection = require('../config/db.js');
const bcrypt = require('bcrypt');

class UserController {
  openUser = (req, res) => {
    let {id} = req.params;
    
    let sql = `SELECT * FROM user WHERE user_id = ?`;
    let values = [id];

    connection.query(sql, values, (err, result) => {
      if(err){
        throw err;
      }
      else {
        let sqlGame = `SELECT * FROM game WHERE user_id = ?`;      
        let valueGame = [id];

        connection.query(sqlGame, valueGame, (err2, result2) => {
          if(err2){
            throw err2;
          }
          else {
            res.render("userX", {user: result[0], game: result2});
          }
        })
      }
    })
  }

  /* register */
  openRegister = (req, res) => {
    res.render("register", {message: ""});
  }

  register = (req, res) => {
    const {name, email, password, bio} = req.body;
    console.log(req.body)
    console.log('req.file ->', req.file);
      
    /* validation */
    if(!name||!email||!password||!bio){
      res.render("register", {message: "Faltan campos por completar."});
    }
    else if (!req.file) {
      res.render("register", {message: "Inserte un avatar."});
    }
    else {  
      /* encript */
      bcrypt.hash(password, 10, (err, hash) => {
        if(err){
        throw err;
        }
        else {      
          let sql = `INSERT INTO user (name, email, password, bio, avatar) VALUES (?,?,?,?,?)`;
          let values = [name, email, hash, bio, req.file.filename];
        
          connection.query(sql, values, (err, result) => {
            if(err){
              throw err;
            }
            else {              
              res.redirect("/");
            }        
          });
        }
      });      
    }    
  }

  /* edit */
  openEdit = (req, res) => {
    const {user_id} = req.params;
    let sql = `SELECT * FROM user WHERE user_id = ?`;
    let values = [user_id];

    connection.query(sql, values, (err, result) => {
      if(err){
        throw err;
      }
      else {
         res.render("userEdit", {userToEdit: result[0]});
      }
    })       
  }

  editProfile = (req, res) => {
    const {user_id} = req.params;
    const {name, bio} = req.body;    

    if(!name||!bio){
      res.render('editProfile', {message: "Campo vacío", userToEdit: user_id});
    }
    else {
      let sql = `UPDATE user SET name = ?, bio = ? WHERE user_id = ?`;
      let values = [name, bio, user_id];      
      
      if(req.file != undefined) {
        sql = `UPDATE user SET name = ?, bio = ?, avatar = ? WHERE user_id = ?`;
        values = [name, bio, req.file.filename, user_id];
      }
         
      connection.query(sql, values,(err, result) => {
        if(err){
          throw err;
        }
        else {
          res.redirect(`/user/userX/${user_id}`);
        }
      })          
    }
  }

  /* login */
  openLogin = (req, res) => {
    res.render("login");
  }

  login = (req, res) => {
    res.redirect("/");
  }

  

  
}


module.exports = new UserController();