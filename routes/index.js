//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Packages 

const express = require('express');
const router = express.Router();
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//
//Set Routes

const viewsRouter = require('./views'); 
router.use('/', viewsRouter)

const apiRouter = require('./api');
router.use('/api', apiRouter)

module.exports = router;
//---------------------------💔🚬 'Zer0Power 💔🚬---------------------------//