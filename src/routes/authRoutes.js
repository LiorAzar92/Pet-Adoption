import express from "express";
import authController from "../controllers/authController.js";
import auth from '../middlewares/auth.js'
import isAdmin from "../middlewares/isAdmin.js";
import provideAllValues from "../middlewares/provideAllValues.js";
import validateEmailAndPassword from "../middlewares/validateEmailAndPassword.js";

const router = express.Router();

router
    .route('/user')
    .get(isAdmin, authController.getAllUsers)
router
    .route('/user/:id')
    .get(authController.getUserById)
    .put(auth, provideAllValues.provideAllValues, authController.updateUser)
router
    .route('/user/:id/full')
    .get(authController.getFullUserById)
router
    .route('/register')
    .post(provideAllValues.provideAllValues, authController.register)
router
    .route('/login')
    .post(provideAllValues.provideEmailAndPassword, validateEmailAndPassword, authController.login)
router
    .route('/logout')
    .get(authController.logout)

export default router;