const db = require('./index.js');

function getAllTaggings(req, res, next) {
  db.any('SELECT * FROM taggings')
  .then((taggings) => {
    res.status(200).json({
      status: 'success',
      message: 'got all taggings',
      body: taggings
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

function getSingleTagging(req, res, next) {
  let taggingId = +(req.params.id);
  db.one('SELECT * FROM taggings WHERE id=$1', [taggingId])
  .then((tagging) => {
    res.status(200).json({
      status: 'success',
      message: 'got single tagging',
      body: tagging
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

function taggingsPerResearcher(req, res, next) {
  let researcherId = +(req.params.id);
  db.any('SELECT * FROM taggings WHERE researcher_id=$1', researcherId)
  .then(taggings => {
    res.status(200).json({
      status: 'success',
      message: 'Got all taggings per researcher',
      body: taggings
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

function taggingsOnAnimal(req, res, next) {
  let animalId = +(req.params.id);
  db.any('SELECT * FROM taggings WHERE animal_id=$1', animalId)
  .then(taggings => {
    res.status(200).json({
      status: 'success',
      message: 'Got all taggings per animal',
      body: taggings
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

function addTagging(req, res, next) {
  db.none('INSERT INTO taggings(animal_id, researcher_id) VALUES (${animal_id}, ${researcher_id})', req.body)
  .then(()=> {
    res.status(200).json({
      status: 'success',
      message: 'created 1 tagging'
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


module.exports = { getAllTaggings, getSingleTagging, taggingsPerResearcher, taggingsOnAnimal, addTagging };
