import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload };
        next()
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authentication Invalid!" });
    }
}

export default auth;