const controller = {};
const path = require('path');
controller.home = function (req, res, next) {
  if (typeof req.session.loggedin !== 'undefined') {
    if (req.session.loggedin != true) {
       res.redirect('/login');
    }
  } else{
     res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
}
controller.list = function (req, res, next) {
  req.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    }
    var sql = "SELECT `ci`.`id_ci`, `ci`.`name_ci`, `dep`.`name_dep` FROM `city` AS `ci` INNER JOIN `departament` AS `dep` ON `ci`.`id_dep`=`dep`.`id_dep` ORDER BY `ci`.`name_ci` ASC";
    conn.query(sql, [], (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
  });
}
controller.add = function (req, res, next) {
  if (typeof req.session.loggedin !== 'undefined') {
    if (req.session.loggedin != true) {
       res.redirect('/login');
    }
  } else {
     res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, '../public/addCity.html'));
}
controller.getSelectDep = function(req, res, next) {
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "SELECT * FROM `departament` ORDER BY `name_dep` ASC";
    conn.query(sql, [], (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
  });
}
controller.save = function (req, res, next) {
  const { name_ci } = req.body;
  const { id_dep } = req.body;
  const addCity = {name_ci, id_dep}
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "INSERT INTO `city` SET ?";
    conn.query(sql, [addCity], (err, rows) => {
      if (err) throw err; 
      res.redirect('/');
    });
  });
}
controller.deletecity = function (req, res, next) {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "DELETE FROM `city` WHERE `id_ci` = ?";
    conn.query(sql, [id], (err, rows) => {
      if (err) throw err;
      res.send('works');
    });
  });
}
controller.veditcity = function (req, res, next) {
  if (typeof req.session.loggedin !== 'undefined') {
    if (req.session.loggedin != true) {
       res.redirect('/login');
    }
  } else {
     res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, '../public/editCity.html'));
}
controller.editcity = function (req, res, next) {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "SELECT * FROM `city` WHERE `id_ci` = ?";
    conn.query(sql, [id], (err, rows) => {
      if (err) throw err;
      sql = "SELECT * FROM `departament` ORDER BY `name_dep` ASC";
      conn.query(sql, [], (err, rows2) => {
        res.send({ci: rows[0], deps: rows2});
      });
    });
  });
}
controller.updatecity = function (req, res, next) {
  const { id_ci } = req.body;
  const { name_ci } = req.body;
  const { id_dep } = req.body;
  const updateCity = {name_ci, id_dep}
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = "UPDATE `city` SET ? WHERE `id_ci` = ?";
    conn.query(sql, [updateCity, id_ci], (err, rows) => {
      if (err) throw err;
       res.redirect('/');
    });
  });
}
controller.searchcity = function (req, res, next) {
  const { data } = req.query;
  req.getConnection((err, conn) => {
    if (err) throw err;
    var sql = `SELECT ci.id_ci, ci.name_ci, dep.name_dep FROM city AS ci INNER JOIN departament AS dep ON ci.id_dep = dep.id_dep WHERE ci.id_ci LIKE '%${data}%' OR ci.name_ci LIKE '%${data}%' OR dep.name_dep LIKE '%${data}%' ORDER BY ci.name_ci ASC`;
    conn.query(sql, [], (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
  });
}

module.exports = controller;