const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gameviews'
});

connection.connect((err) => {
  if(err){
    console.log("Error de conexión con la DB", err.stack);
  }
  else {
    console.log("Conexión correcta con la DB.")
  }
});

module.exports = connection;