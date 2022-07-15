const controller = {};
const path = require('path');
controller.indexdep = function  (req, res, next) {
  if (typeof req.session.loggedin !== 'undefined') {
    if (req.session.loggedin != true) {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, '../public/indexDep.html'));
}
controller.listdep = function (req, res, next) {
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "SELECT * FROM `departament` ORDER BY `name_dep` ASC";
    conn.query(sql, [], (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
  });
}
controller.addepartament = function (req, res, next) {
  if (typeof req.session.loggedin !== 'undefined') {
    if (req.session.loggedin != true) {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, '../public/addEp.html'));
}
controller.addep = function (req, res, next) {
  const { name_dep } = req.body;
  const addEp = {name_dep}
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "INSERT INTO `departament` SET ?";
    conn.query(sql, [addEp], (err, rows) => {
      if (err) throw err;
      res.redirect('/indexdep');
    });
  });
}
controller.deletedep = function (req, res, next) {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "DELETE FROM `departament` WHERE `id_dep` = ?";
    conn.query(sql, [id], (err, rows) => {
      if (err) throw err;
      res.send('works');
    });
  });
}
controller.veditdep = function (req, res, next) {
  if (typeof req.session.loggedin !== 'undefined') {
    if (req.session.loggedin != true) {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, '../public/editDep.html'));
}
controller.editdep = function (req, res, next) {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "SELECT * FROM `departament` WHERE `id_dep` = ?";
    conn.query(sql, [id], (err, rows) => {
      if (err) throw err;
      res.send(rows[0]);
    });
  });
}
controller.updatedep = function (req, res, next) {
  const { id_dep } = req.body;
  const { name_dep } = req.body;
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "UPDATE `departament` SET `name_dep` = ? WHERE `id_dep` = ?";
    conn.query(sql, [name_dep, id_dep], (err, rows) => {
      if (err) throw err;
      res.redirect('/indexdep');
    });
  });
}
controller.searchdep = function (req, res, next) {
  const { data } = req.query;
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = `SELECT * FROM departament WHERE id_dep LIKE '%${data}%' OR name_dep LIKE '%${data}%'`;
    conn.query(sql, [], (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
  });
}
module.exports = controller;