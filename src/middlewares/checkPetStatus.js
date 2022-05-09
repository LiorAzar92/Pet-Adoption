import Pet from '../models/Pet.js';

const checkPetStatus = async (req, res, next) => {
    const { id: petId } = req.params;
    const pet = await Pet.findOne({ _id: petId })
    if (pet.adoptionStatus === 'Adopted') {
        throw new Error("This pet isn't available!");
    }
    next();
}

export default checkPetStatus;