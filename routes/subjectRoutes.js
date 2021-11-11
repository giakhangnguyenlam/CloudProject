var express = require('express');
var router = express.Router();

const {addSubject, getSubjects} = require('../services/SubjectService')

router.post('/', addSubject);

router.get('/', getSubjects);

module.exports = router;