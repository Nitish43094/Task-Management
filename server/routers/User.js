const express = require('express');
const router = express.Router();

const {
    sendOTP,
    signUp,
    login,
    deleteUser,
    changePassword
} = require('../controllers/Auth');

const {
    resetPasswordToken,
    resetPassword,
} = require('../middlewares/ResetPassword');
const { auth } = require('../middlewares/auth');

router.post('/signup',signUp)
router.post('/login',login)
router.post('/sendotp',sendOTP);
router.post("/changePassword",auth,changePassword);

router.post('/rect-password-token',resetPasswordToken)
router.post("/rect-password",resetPassword)
router.delete('/delete-user',auth,deleteUser);
module.exports = router;
