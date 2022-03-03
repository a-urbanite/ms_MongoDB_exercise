const mongoosedbManagement = require('./mongoose')
const mongodbManagement = require('./mongo')

const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000

app.post('/', async (req, res) => {
  // const id = await mongodbManagement.addToDb(req.body);
  const id = await mongoosedbManagement.addToDb(req.body);
  res
    .location(`/${id}`)
    .sendStatus(201)
})

app.get('/:id', async (req, res) => {
    // const result = await mongodbManagement.readOneFromDb(req.params.id);
    const result = await mongoosedbManagement.readOneFromDb(req.params.id);
    res
      .status(200)
      .json(result)
  })

app.delete('/:id', async (req, res) => {
  // const result = await mongodbManagement.deleteOneFromDb(req.params.id);
  const result = await mongoosedbManagement.deleteOneFromDb(req.params.id);
  res
    .sendStatus(204)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports.app = app;