import express from "express";
import petsController from "../controllers/petsController.js";
import checkPetStatus from "../middlewares/checkPetStatus.js";
import ifPetExist from "../middlewares/ifPetExsit.js";
import provideAllValuesPet from "../middlewares/provideAllValuesPet.js";
import multer from "multer";
import auth from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";
const upload = multer({ dest: process.env.UPLOAD_FOLDER + "/" });


const router = express.Router();

router
    .route('/')
    .get(petsController.getAllPets)
    .post(upload.single('picture'), isAdmin, provideAllValuesPet, petsController.createPet)
router
    .route('/:id')
    .get(petsController.getPetById)
    .delete(ifPetExist, petsController.deletePet)
    .put(upload.single('picture'), isAdmin, ifPetExist, petsController.updatePet)
router
    .route('/:id/save')
    .post(auth, petsController.savePet)
    .delete(auth, petsController.unsavedPet)
router
    .route('/:id/adopt')
    .post(auth, checkPetStatus, petsController.adoptOrFosterPet)
router
    .route('/:id/return')
    .post(auth, petsController.returnPet)
router
    .route('/user/:id')
    .get(petsController.getPetsByUserId)


export default router;