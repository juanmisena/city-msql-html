const router = require('express').Router();
const cityController = require('../controllers/cityController');
const depController = require('../controllers/depController');
const userController = require('../controllers/userController');
// getter City
router.get('/', cityController.home);
router.get('/list', cityController.list);
router.get('/addCity', cityController.add);
router.get('/getSelectDep', cityController.getSelectDep);
router.get('/veditcity', cityController.veditcity);
router.get('/editcity/:id', cityController.editcity);
router.get('/searchcity', cityController.searchcity);
// getter Dep
router.get('/indexdep', depController.indexdep);
router.get('/listdep', depController.listdep);
router.get('/addepartament', depController.addepartament);
router.get('/veditdep', depController.veditdep);
router.get('/editdep/:id', depController.editdep);
router.get('/searchdep', depController.searchdep);
// getter User
router.get('/login', userController.login);
router.get('/getloggedin', userController.getloggedin);
router.get('/logout', userController.logout);
router.get('/register', userController.register);
router.get('/passreset', userController.passreset);
router.get('/passresetuni', userController.passresetuni);
// post City
router.post('/addCity', cityController.save);
router.post('/deletecity/:id', cityController.deletecity);
router.post('/updatecity', cityController.updatecity);
// post Dep
router.post('/addep', depController.addep);
router.post('/deletedep/:id', depController.deletedep);
router.post('/updatedep', depController.updatedep);
// post User
router.post('/login', userController.saveuser);
router.post('/register', userController.saveregister);
router.post('/passreset', userController.savepassreset);
module.exports = router;