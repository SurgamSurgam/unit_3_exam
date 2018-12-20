const express = require('express');
const router = express.Router();
const { getAllResearchers, getSingleResearcher, addResearcher, editResearcher, deleteResearcher } = require('../db/queries/researchersQueries.js');

router.get('/', getAllResearchers);
router.get('/:id', getSingleResearcher);
router.post('/', addResearcher);
router.patch('/:id', editResearcher);
router.delete('/:id', deleteResearcher);

module.exports = router;
