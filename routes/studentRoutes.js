var express = require('express');
var router = express.Router();

const {login, signup} = require('../services/StudentService')

const {addToSubjectWithUserId, changeSubject, getSubjectByStudentId} = require('../services/SubjectService')

router.post('/signup', signup);

router.post('/login', login);

router.post('/subject', addToSubjectWithUserId);

router.put('/subject', changeSubject);

router.get('/subject/:id', getSubjectByStudentId);

module.exports = router;