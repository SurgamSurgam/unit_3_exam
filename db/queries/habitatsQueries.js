const db = require('./index.js');

function getAllHabitats(req, res, next) {
  db.any('SELECT * FROM habitats')
  .then((habitats) => {
    res.status(200).json({
      status: 'success',
      message: 'got all habitats',
      body: habitats
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

function getSingleHabitat(req, res, next) {
  let habitatId = +(req.params.id);
  db.one('SELECT * FROM habitats WHERE id=$1', [habitatId])
  .then((habitat) => {
    res.status(200).json({
      status: 'success',
      message: 'got single habitat',
      body: habitat
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

function addHabitat(req, res, next) {
  db.none('INSERT INTO habitats(category) VALUES (${category})', req.body)
  .then(()=> {
    res.status(200).json({
      status: 'success',
      message: 'created 1 habitat'
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

module.exports = { getAllHabitats, getSingleHabitat, addHabitat };
