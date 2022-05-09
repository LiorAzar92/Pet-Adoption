import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes';
import Pet from "../models/Pet.js";

const register = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    const user = await User.create({ name, email, password, phoneNumber });
    user.password = undefined;
    res
        .status(StatusCodes.CREATED)
        .json({ user });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password')
    const token = user.createJWT();
    user.password = undefined;
    res
        .cookie("token", token, { httpOnly: true })
        .status(StatusCodes.OK)
        .json({ user });
}

const logout = async (req, res) => {
    res
        .clearCookie('token')
        .status(StatusCodes.OK)
        .send('User Logged out!')
}

const updateUser = async (req, res) => {
    const { id: userId } = req.params;
    const { email, password, name, phoneNumber, bio } = req.body;
    const user = await User.findOne({ _id: userId });

    user.email = email;
    user.name = name;
    user.phoneNumber = phoneNumber;
    user.bio = bio;
    if (password) {
        user.password = password;
        await user.save();
    }
    const token = user.createJWT();
    user.password = undefined;
    res
        .cookie("token", token, { httpOnly: true })
        .status(StatusCodes.OK)
        .json({ user });
}

const getAllUsers = async (req, res) => {
    const users = await User.find();
    users.forEach(user => {
        user.password = undefined;
    })
    res
        .status(StatusCodes.OK)
        .json({ users })
}

const getUserById = async (req, res) => {
    const { id: userId } = req.params;
    const user = await User.findOne({ _id: userId });
    res
        .status(StatusCodes.OK)
        .json({ user });
}

const getFullUserById = async (req, res) => {
    const { id: userId } = req.params;
    const user = await User.findOne({ _id: userId });
    const pets = await Pet.find({ _id: { $in: user.ownedPets } })
    res
        .status(StatusCodes.OK)
        .json({ user, pets });
}

export default { register, login, updateUser, getAllUsers, getUserById, getFullUserById, logout };