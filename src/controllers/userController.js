const controller = {}
const path = require('path');
controller.login = function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/login.html'));
}
controller.saveuser = function (req, res, next) {
 const { name_user } = req.body;
 const { pass_user } = req.body;
 req.getConnection((err, conn) => {
   if (err) throw err;
   var sql = "SELECT `id_user`,`name_user` FROM `user` WHERE `name_user` = ? AND `pass_user` = ?";
   conn.query(sql, [name_user, pass_user], (err, rows) => {
     if (err) throw err;
     if (rows.length > 0) {
      rows.forEach((user) => {
        req.session.id_user = user.id_user;
        req.session.name_user = user.name_user;
        req.session.loggedin = true;
         res.redirect('/');
      });
     } else {
       res.redirect('/login');
     }
   });
 });
}
controller.getloggedin = function (req, res, next) {
  res.send(req.session.name_user);
}
controller.logout = function (req, res, next) {
  req.session.destroy((err) => {
    if (err) throw err;
     res.redirect('/login');
  });
}
controller.register = function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/register.html'));
}
controller.saveregister = function (req, res, next) {
  const { add_name_user } = req.body;
  const { add_pass_user } = req.body;
  const addUser = {name_user: add_name_user, pass_user: add_pass_user}
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "INSERT INTO `user` SET ?";
    conn.query(sql, [addUser], (err, rows1) => {
      if (err) {
        res.redirect('/login');
      }
      sql = "SELECT DISTINCT * FROM `user` WHERE `name_user` = ?";
      conn.query(sql, [addUser.name_user], (err, rows2) => {
        // if (err) throw err;
        if (rows2.length > 0) {
          rows2.forEach((user) => {
            req.session.id_user = user.id_user;
            req.session.name_user = user.name_user;
            req.session.loggedin = true;
            res.redirect('/');
          });
        } else {
          res.redirect('/login');
        }
      });
    });
  });
}
controller.passresetuni = function (req, res, next) {
  const { user } = req.query;
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "SELECT * FROM user WHERE name_user = ?";
    conn.query(sql, [user], (err, rows) => {
      if (err) throw err;
      if (rows.length > 0) {
        res.send(rows[0]);
      } else {
        res.send(false);
      }
    });
  });
}
controller.passreset = function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/passReset.html'));
}
controller.savepassreset = function (req, res, next) {
  const { id_user } = req.body;
  const { pass_user } = req.body;
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "UPDATE user SET pass_user = ? WHERE id_user = ?";
    conn.query(sql, [pass_user, id_user], (err, rows) => {
      if (err) {
        res.redirect('/login');
      }
      res.send('ok');
    });
  });
}
module.exports = controller;