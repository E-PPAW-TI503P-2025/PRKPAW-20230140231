<<<<<<< HEAD
const express = require('express');
const router = express.Router();
 	const reportController = require('../controllers/reportController');
 	const { addUserData, isAdmin } = require('../middleware/permissionMiddleware');
 	router.get('/daily', [addUserData, isAdmin], reportController.getDailyReport);
 	module.exports = router;
=======
const express = require('express');
const router = express.Router();
 	const reportController = require('../controllers/reportController');
 	const { addUserData, isAdmin } = require('../middleware/permissionMiddleware');
 	router.get('/daily', [addUserData, isAdmin], reportController.getDailyReport);
 	module.exports = router;
>>>>>>> 6c72c23d80c0df10ba53ea4e5a1bc3ef43760673
