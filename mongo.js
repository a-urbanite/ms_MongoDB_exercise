const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://ms-user:fXBtz5Sg47rSOCMs@cluster0.ocbuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const addToDb = async (data) => {
    await client.connect();

    // const client = await MongoClient.connect(uri, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   });
    
    const collection = client.db("test").collection("foods");
    await collection.insertOne(data)
    const result = await collection.findOne({name: data.name})
    client.close();
    return result._id.toString()
};

const readOneFromDb = async (id) => {
    await client.connect();
    const collection = client.db("test").collection("foods");

    const result = await collection.findOne({_id: new ObjectId(id)})

    client.close();
    return result
}

const deleteOneFromDb = async (id) => {
    await client.connect();
    const collection = client.db("test").collection("foods");

    await collection.deleteOne({_id: new ObjectId(id)})

    client.close();
    // return result
};

module.exports.addToDb = addToDb;   
module.exports.readOneFromDb = readOneFromDb;
module.exports.deleteOneFromDb = deleteOneFromDb;