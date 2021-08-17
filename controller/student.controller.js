const { parse } = require('json5');
const studentModel = require('../models/student.model');
const {createStudentValidation} = require('../validations/student.validation');

const createStudent = async (req,res,next) => {
    const  {error } = createStudentValidation(req.body);
    if (error) {
        res.status(400).send({message:error.details['0'].message})
    } else {
        try {
            const {firstName, lastName,email,Phone,address,meeting_time} = req.body;
            const Students = new studentModel({firstName, lastName,email,Phone,address,meeting_time});
            const SavedStudent = await Students.save();
            res.send({message:"studend saved successfully", data: SavedStudent});
        } catch (error) {
            res.status(400).send({message:error.details['0'].message})
        }
    }
}

const studentslist = async(req,res,next) => {
    const {params,query} = req;
    const limit = parseInt(query.limit);
    const students = await studentModel.find().limit(limit).exec();
    res.send({data:students});
}

const editStudent = async(req,res,next) => {
    const {params,query} = req;
    const studentId =  params.id;
    const {firstName, lastName,email,Phone,address,meeting_time} = req.body;
    const student = await studentModel.findByIdAndUpdate({_id:studentId},{firstName, lastName,email,Phone,address,meeting_time}).exec();
    res.send({data:student})
}

const deleteStudent = async (req,res,next) => {
    const {params,query} = req;
    const deleteId =  params.id;
    const deleteStudent = await studentModel.findOneAndDelete({_id:deleteId})
    res.send({message:"student deleted", data:deleteStudent});
}



module.exports = { createStudent ,editStudent, deleteStudent, studentslist}