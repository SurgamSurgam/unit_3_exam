const express = require('express');
const router = express.Router();
const { getAllAnimals, getSingleAnimal, addAnimal, editAnimal, deleteAnimal } = require('../db/queries/animalsQueries.js');

router.get('/', getAllAnimals);
router.get('/:id', getSingleAnimal);
router.post('/', addAnimal);
router.patch('/:id', editAnimal);
router.delete('/:id', deleteAnimal);

module.exports = router;
