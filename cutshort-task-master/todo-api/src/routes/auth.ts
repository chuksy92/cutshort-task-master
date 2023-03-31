/** @format */


const express = require('express');
const router = express.Router();
import  authController  from '../controllers/authController';




router.route('/login').post(authController.login);
router.route('/register').post(authController.register);


export default router;
