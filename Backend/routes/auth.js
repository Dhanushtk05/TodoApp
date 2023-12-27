const express = require('express');
const path = require('path');

const {registerUser, loginUser, getUser, logoutuser, getUserProfile, forgotPassword, resetPassword} = require('../controllers/authControllers');
const {addActivity, showActions, deleteActions, sendNotification, getSingleTask, updateTask} = require('../controllers/todoAction');
const {isAuthenticateUser} = require('../middlewares/authenticate');

const router = express.Router();


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutuser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(isAuthenticateUser,getUserProfile);
router.route('/getsingleuser/:id').get(isAuthenticateUser,getUser);


router.route('/addactivity').post(isAuthenticateUser,addActivity);
router.route('/showactions').get(isAuthenticateUser,showActions);
router.route('/getsingletask/:id').get(isAuthenticateUser,getSingleTask);
router.route('/updatetask/:id').put(isAuthenticateUser,updateTask);
router.route('/deleteactions/:id').delete(isAuthenticateUser,deleteActions);
router.route('/sendnotification').post(sendNotification);




module.exports = router;
