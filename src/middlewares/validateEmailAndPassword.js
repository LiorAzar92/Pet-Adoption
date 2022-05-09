import User from "../models/User.js";

const validateEmailAndPassword = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        throw new Error('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid Credentials')
    }
    next()
}

export default validateEmailAndPassword;