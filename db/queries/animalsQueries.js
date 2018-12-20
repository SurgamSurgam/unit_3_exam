const db = require('./index.js');

function getAllAnimals(req, res, next) {
  db.any('SELECT * FROM animals')
  .then((animals) => {
    res.status(200).json({
      status: 'success',
      message: 'got all animals',
      body: animals
    })
  })
  .catch(err => {
      res.status(404).json({
        status: 'error',
        message: err.message
      });
      next();
    });
}

function getSingleAnimal(req, res, next) {
  let animalId = +(req.params.id);
  db.one('SELECT * FROM animals WHERE id=$1', [animalId])
  .then((animal) => {
    res.status(200).json({
      status: 'success',
      message: 'got single animal',
      body: animal
    })
  })
  .catch(err => {
      res.status(404).json({
        status: 'error',
        message: err.message
      });
      next(err.message);
    });
}

function addAnimal(req, res, next) {
  db.none('INSERT INTO animals(species_id, nickname) VALUES (${species_id}, ${nickname})', req.body)
  .then(()=> {
    res.status(200).json({
      status: 'success',
      message: 'created 1 animal'
    })
  })
  .catch(err => {
      res.status(404).json({
        status: 'error',
        message: err.message
      });
      next(err.message);
    });
}

function editAnimal(req, res, next) {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  if(req.body.species_id && req.body.species_id.toLowerCase() === "null") {
    req.body.species_id = null;
  }
  if(req.body.nickname && req.body.nickname.toLowerCase() === "null") {
    req.body.nickname = null;
  }

  db.none(
    "UPDATE animals SET " + queryString + " WHERE id=" + req.params.id,
    req.body
  )
  .then(()=> {
    res.status(200).json({
      status: 'success',
      message: 'updated 1 animal'
    })
  })
  .catch(err => {
      res.status(404).json({
        status: 'error',
        message: err.message
      });
      next(err.message);
    });
}

function deleteAnimal(req, res, next) {
  let animalId = +(req.params.id);
  db.result('DELETE FROM animals WHERE id=$1', [animalId])
  .then(result => {
    res.status(200).json({
      status: 'success',
      message: 'deleted animal',
      body: result
    })
  })
  .catch(err => {
      res.status(404).json({
        status: 'error',
        message: err.message
      });
      next(err.message);
    });
}

module.exports = { getAllAnimals, getSingleAnimal, addAnimal, editAnimal, deleteAnimal };
