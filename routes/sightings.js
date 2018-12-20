const express = require('express');
const router = express.Router();
const { getAllSightings, sightingsOf1Species, sightingsOf1Researcher, sightingsOfAHabitat, addSighting, deleteSighting } = require('../db/queries/sightingsQueries.js');

router.get('/', getAllSightings);
router.get('/species/:id', sightingsOf1Species);
router.get('/researchers/:id', sightingsOf1Researcher);
router.get('/habitats/:id', sightingsOfAHabitat);
router.post('/', addSighting);
router.delete('/:id', deleteSighting);

module.exports = router;
