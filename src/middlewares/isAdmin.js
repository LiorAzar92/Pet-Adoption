import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

const isAdmin = async (req, res, next) => {
    const token = req.cookies.token;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload };
    const user = await User.findOne({ _id: req.user.userId.userId })
    if (user.isAdmin) {
        next()
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: "You are no an Administrator!" });
    }
}

export default isAdmin;