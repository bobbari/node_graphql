const router = require('express').Router();
const Pagenotfounder = require('../controller/404.controller');

router.get('/',Pagenotfounder);

module.exports = router;
