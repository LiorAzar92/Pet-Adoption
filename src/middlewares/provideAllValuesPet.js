const provideAllValuesPet = (req, res, next) => {
    const { name, type, adoptionStatus, height, weight, color, bio, hypoallergenic, dietaryRestrictions, breedOfAnimal } = req.body;
    if (!name || !type || !adoptionStatus || !height || !weight || !color || !bio || !hypoallergenic || !dietaryRestrictions || !breedOfAnimal) {
        throw new Error('Please provide all values')
    }
    next();
}

export default provideAllValuesPet;