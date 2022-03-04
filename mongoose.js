const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://ms-user:fXBtz5Sg47rSOCMs@cluster0.ocbuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.Promise = global.Promise;


const msSchema = new mongoose.Schema({
    name: String,
}, {versionKey: false})

const Animal = mongoose.model('Animal', msSchema)


const addToDb = async (body) => {
    let id;
    const testAnimal = await new Animal(body)
    await testAnimal
        .save()
        .then(doc => {
            id = doc._id.toString()
        })
        .catch(err => next(err));
    return id;
};

const readOneFromDb = async (id) => {
    let searchedAnimal;
    await Animal
        .find({_id: mongoose.Types.ObjectId(id)})
        .then(doc => {
            searchedAnimal = doc[0];
        })
        .catch(err => next(err));
    return searchedAnimal;
};

const deleteOneFromDb = async (id) => {
    await Animal
        .findOneAndRemove({_id: mongoose.Types.ObjectId(id)})
        .catch(err => next(err));
};

module.exports.addToDb = addToDb;   
module.exports.readOneFromDb = readOneFromDb;
module.exports.deleteOneFromDb = deleteOneFromDb;