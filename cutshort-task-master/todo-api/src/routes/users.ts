/** @format */

var express = require('express');
const router = express.Router();
import userController from '../controllers/userController';
import { restrictTo, verifyToken } from '../utils/index.js';

router.use(verifyToken)

/* GET users listing. */
router.get('/allUsers', userController.getUsers);
router.post('/create', userController.createUser);

// All routes below this middleware will be protected
router
	.get('/:userId', userController.getUser)
	.put(restrictTo(['admin']), userController.updateUser)
	.delete(restrictTo(['admin']), userController.deleteUser);



export default router;
