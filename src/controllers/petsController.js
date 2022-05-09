import Pet from '../models/Pet.js';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

const getAllPets = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    const pets = await Pet.find(req.query).sort('name').skip(skip).limit(limit);
    const totalPets = await Pet.countDocuments(req.query);
    const numOfPages = Math.ceil(totalPets / limit);
    res
        .status(StatusCodes.OK)
        .json({ pets, totalPets, numOfPages })
}

const createPet = async (req, res) => {
    const uploadResult =
        req.file && (await cloudinary.uploader.upload(req.file.path));
    req.file && uploadResult && fs.promises.unlink(req.file.path);
    const pet = await Pet.create({
        ...req.body,
        picture_url: uploadResult.secure_url,
        picture_public_id: uploadResult.public_id
    });
    res
        .status(StatusCodes.CREATED)
        .json({ pet });
}

const updatePet = async (req, res) => {
    const { id: petId } = req.params;
    let uploadResult = {};
    if (req.file) {
        uploadResult =
            req.file && (await cloudinary.uploader.upload(req.file.path));
        req.file && uploadResult && fs.promises.unlink(req.file.path);
        await cloudinary.uploader.destroy(req.body.picture_public_id)
    }
    await Pet.findOneAndUpdate({ _id: petId },
        {
            ...req.body,
            picture_url: uploadResult.secure_url ? uploadResult.secure_url : req.body.picture_url,
            picture_public_id: uploadResult.public_id ? uploadResult.public_id : req.body.picture_public_id
        }
        , {
            new: true,
            runValidators: true,
        });
    const pets = await Pet.find();
    res
        .status(StatusCodes.OK)
        .json({ pets });
}

const deletePet = async (req, res) => {
    const { id: petId } = req.params;
    const pet = await Pet.findOneAndDelete({ _id: petId });
    await cloudinary.uploader.destroy(pet.picture_public_id);
    const pets = await Pet.find();
    res
        .status(StatusCodes.OK)
        .json({ pets });
}

const getPetById = async (req, res) => {
    const { id: petId } = req.params;
    const pet = await Pet.findOne({ _id: petId });
    res
        .status(StatusCodes.OK)
        .json({ pet });
}

const savePet = async (req, res) => {
    const { id: petId } = req.params;
    const { userId } = req.body;
    const user = await User.findOneAndUpdate({ _id: userId }, {
        $push: { savedPets: petId }
    }, {
        new: true,
        runValidators: true,
    });
    res
        .status(StatusCodes.OK)
        .json({ user });
}

const unsavedPet = async (req, res) => {
    const { id: petId } = req.params;
    const { userId } = req.query;
    const user = await User.findOneAndUpdate({ _id: userId }, {
        $pull: { savedPets: petId }
    }, {
        new: true,
        runValidators: true,
    }
    );
    const token = user.createJWT();
    res
        .cookie("token", token, { httpOnly: true })
        .status(StatusCodes.OK)
        .json({ user });
}

const adoptOrFosterPet = async (req, res) => {
    const { id: petId } = req.params;
    const { userId, adoptionStatus } = req.body;
    const pet = await Pet.findOneAndUpdate({ _id: petId }, { adoptionStatus: adoptionStatus }, {
        new: true,
        runValidators: true,
    });
    const user = await User.findOneAndUpdate({ _id: userId }, {
        $push: { ownedPets: pet }
    }, {
        new: true,
        runValidators: true,
    });
    res
        .status(StatusCodes.OK)
        .json({ user });
}

const returnPet = async (req, res) => {
    const { id: petId } = req.params;
    const { userId } = req.body;
    const pet = await Pet.findOneAndUpdate({ _id: petId }, { adoptionStatus: 'Available' }, {
        new: true,
        runValidators: true,
    });
    const user = await User.findOneAndUpdate({ _id: userId }, {
        $pull: { "ownedPets": pet._id }
    }, {
        new: true,
        runValidators: true,
    });
    res
        .status(StatusCodes.OK)
        .json({ user });
}

const getPetsByUserId = async (req, res) => {
    const { id: userId } = req.params;
    const { petDef } = req.query;
    const user = await User.findOne({ _id: userId })
    let pets = [];
    if (petDef === 'savedPets') {
        pets = await Pet.find({ _id: { $in: user.savedPets } })
    } else {
        pets = await Pet.find({ _id: { $in: user.ownedPets } })
    }
    res
        .status(StatusCodes.OK)
        .json({ pets });
}


export default { getAllPets, createPet, deletePet, updatePet, getPetById, savePet, adoptOrFosterPet, unsavedPet, returnPet, getPetsByUserId }