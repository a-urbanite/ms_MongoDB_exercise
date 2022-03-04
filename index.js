const mongoosedbManagement = require('./mongoose')
const mongodbManagement = require('./mongo')

const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000

const requestValidator = (req, res, next) => {
  if (!req.is('application/json')
      || req.body.name === undefined) {
    return res.status(400).send('invalid Input');
  }
  return next();
};

app.post('/', requestValidator, async (req, res, next) => {
  try {
    // const id = await mongodbManagement.addToDb(req.body);
    const id = await mongoosedbManagement.addToDb(req.body);
    res
      .location(`/${id}`)
      .sendStatus(201)
  } catch (err) {
    next(err);
  }
})

app.get('/:id', async (req, res, next) => {
  try {
    // throw new Error('dfsdfsfsd')
    // const result = await mongodbManagement.readOneFromDb(req.params.id);
    const result = await mongoosedbManagement.readOneFromDb(req.params.id);
    res
      .status(200)
      .json(result)
  } catch (err) {
    next(err);
  }
  })

app.delete('/:id', async (req, res, next) => {
  try {
    // const result = await mongodbManagement.deleteOneFromDb(req.params.id);
    const result = await mongoosedbManagement.deleteOneFromDb(req.params.id);
    res
      .sendStatus(204)
  } catch (err) {
    next(err);
  }
})

app.use((err, req, res, next) => {
  // console.log('ERROR LOG', err.statusCode)
  if (err.name === 'BSONTypeError') {
    return res.status(400).send('Invalid ObjectID');
  }
  res.status(500);
  res.json(
    {
      title: 'ERROR',
      message: err.message,
      code: err.statusCode,
      stack: err.stack,
    },
  );
  // res.status(505).send(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports.app = app;