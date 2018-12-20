const db = require('./index.js');

function getAllSightings(req, res, next) {
  db.any('SELECT * FROM sightings')
  .then((sightings) => {
    res.status(200).json({
      status: 'success',
      message: 'got all sightings',
      body: sightings
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

function sightingsOf1Species(req, res, next) {
  let speciesId = +(req.params.id);
  db.any('SELECT * FROM sightings WHERE species_id=$1', speciesId)
  .then(sightings => {
    res.status(200).json({
      status: 'success',
      message: 'Got all sightings by species',
      body: sightings
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

function sightingsOf1Researcher(req, res, next) {
  let researcherId = +(req.params.id);
  db.any('SELECT * FROM sightings WHERE researcher_id=$1', researcherId)
  .then(sightings => {
    res.status(200).json({
      status: 'success',
      message: 'Got all sightings by researcher',
      body: sightings
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

function sightingsOfAHabitat(req, res, next) {
  let habitatId = +(req.params.id);
  db.any('SELECT * FROM sightings WHERE habitat_id=$1', habitatId)
  .then(sightings => {
    res.status(200).json({
      status: 'success',
      message: 'Got all sightings of this habitat',
      body: sightings
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

function addSighting(req, res, next) {
  db.none('INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES (${researcher_id}, ${species_id}, ${habitat_id})', req.body)
  .then(()=> {
    res.status(200).json({
      status: 'success',
      message: 'created 1 sighting'
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

function deleteSighting(req, res, next) {
  let sightingId = +(req.params.id);
  db.result('DELETE FROM sightings WHERE id=$1', [sightingId])
  .then(result => {
    res.status(200).json({
      status: 'success',
      message: 'deleted sighting',
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

module.exports = { getAllSightings, sightingsOf1Species, sightingsOf1Researcher, sightingsOfAHabitat, addSighting, deleteSighting };
