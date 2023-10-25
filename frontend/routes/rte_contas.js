var express = require('express');
var contasApp = require("../app/contas/controller/ctlContas")

////var login = require("../controllers/login/login")
var router = express.Router();
//const passport = require('passport');



//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 

/* GET métodos */
//router.get('/', authenticationMiddleware, contasApp.getDados);
router.get('/openContasInsert', authenticationMiddleware, contasApp.openContasInsert);
router.get('/openContasUpdate/:contaid', authenticationMiddleware, contasApp.openContasUpdate);
router.get('/viewContas/:id/:oper', authenticationMiddleware, contasApp.viewContas);

router.get('/', contasApp.getAllContas);

/* POST métodos */
router.post('/insertContas', authenticationMiddleware, contasApp.insertContas);
router.post('/getDados', authenticationMiddleware, contasApp.getDados);
router.post('/updateContas', authenticationMiddleware, contasApp.updateContas);
router.post('/DeleteContas', authenticationMiddleware, contasApp.DeleteContas);



module.exports = router;