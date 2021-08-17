const router = require('express').Router();
const {createStudent, editStudent, deleteStudent, studentslist} = require('../controller/student.controller');

router.get('/list',studentslist);
router.post('/createstudent',createStudent);
router.put('/edit/:id',editStudent);
router.delete('/delete/:id',deleteStudent);


module.exports = router;