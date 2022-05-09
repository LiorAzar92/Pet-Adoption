import Pet from '../models/Pet.js';

const ifPetExist = async (req, res, next) => {
    const { id: petId } = req.params;

    const pet = await Pet.findOne({ _id: petId })
    if (!pet) {
        throw new Error('Not pet matching for this id');
    }
    next();
}

export default ifPetExist;