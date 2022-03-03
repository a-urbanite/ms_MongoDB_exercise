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
            // console.log(doc._id.toString());
            id = doc._id.toString()
        })
        .catch(err => console.error(err));
    return id;
};

const readOneFromDb = () => {
    
};

const deleteOneFromDb = () => {
    
};

module.exports.addToDb = addToDb;   
module.exports.readOneFromDb = readOneFromDb;
module.exports.deleteOneFromDb = deleteOneFromDb;