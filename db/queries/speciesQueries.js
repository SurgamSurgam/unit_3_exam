const db = require('./index.js');

function getAllSpecies(req, res, next) {
  db.any('SELECT * FROM species')
  .then((species) => {
    res.status(200).json({
      status: 'success',
      message: 'got all species',
      body: species
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

function getSingleSpecies(req, res, next) {
  let speciesId = +(req.params.id);
  db.one('SELECT * FROM species WHERE id=$1', [speciesId])
  .then((species) => {
    res.status(200).json({
      status: 'success',
      message: 'got single species',
      body: species
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

function addSpecies(req, res, next) {
  db.none('INSERT INTO species(name, is_mammal) VALUES (${name}, ${is_mammal})', req.body)
  .then(()=> {
    res.status(200).json({
      status: 'success',
      message: 'created 1 species'
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

module.exports = { getAllSpecies, getSingleSpecies, addSpecies };
