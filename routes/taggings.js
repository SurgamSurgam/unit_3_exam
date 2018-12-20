const express = require('express');
const router = express.Router();
const { getAllTaggings, getSingleTagging, taggingsPerResearcher, taggingsOnAnimal, addTagging } = require('../db/queries/taggingsQueries.js');

router.get('/', getAllTaggings);
router.get('/:id', getSingleTagging);
router.get('/researchers/:id', taggingsPerResearcher);
router.get('/animals/:id', taggingsOnAnimal);
router.post('/', addTagging);

module.exports = router;
