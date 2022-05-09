const provideAllValues = (req, res, next) => {
    const { name, email, phoneNumber } = req.body;
    if (!name || !email || !phoneNumber) {
        throw new Error('Please provide all values')
    }
    next()
}

const provideEmailAndPassword = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error('Please provide all values');
    }
    next()
}

export default { provideAllValues, provideEmailAndPassword }