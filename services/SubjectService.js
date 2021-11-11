const Subject = require('../schemas/SubjectSchema');
const Student = require('../schemas/StudentSchema');

const addToSubjectWithUserId  = (req, res, next) => {
    Subject.findOne({idSubject: req.body.subjectId}, (err, subject) => {
        if(err) return res.status(404).json({mess:err});
        subject.studentId.push(req.body.studentId);
        subject.save((err, result) => {
            if(err) return res.status(404).json({mess: err})
            Student.findOne({id: req.body.studentId}, (err, student) => {
                if(err) return res.status(404).json({mess: err});
                student.subjects.push(req.body.subjectId);

                student.save((err, result) => {
                    if(err) return res.status(404).json({mess: err});

                    return res.status(201).json({mess: 'Đăng ký thành công'});
                })
            })
        })
    })
}

const changeSubject = (req, res, next) => {
    Student.findOne({id: req.body.studentId}, (err, student) => {
        if(err) return res.status(404).json({mess: err});
        student.subjects = student.subjects.filter((subject) => subject !== req.body.oldSubjectId);

        student.save((err, result) => {
            if(err) return res.status(404).json({mess: result});

            Subject.findOne({idSubject: req.body.oldSubjectId}, (err, subject) => {
                if(err) return res.status(404).json({mess:err});

                subject.studentId = subject.studentId.filter((student) => student !== req.body.studentId);

                subject.save((err, result) => {
                    if(err) return res.status(404).json({mess: err});

                    addToSubjectWithUserId(req, res, next);
                })
            })
        })
    })
}

const getSubjects = (req, res, next) => {
    Subject.find({}, 'id idSubject name type number teacherName', (err, subjects) => {
        if(err) return res.status(404).json({mess:err})
        return res.status(200).json(subjects);
    })
}

const addSubject = (req, res, next) => {
    Subject.findOne({$or: [{idSubject: req.body.idSubject}, {name: req.body.name}]}, (err, subject) => {
        if(err) return res.status(404).json({mess: err});

        if(subject){
            return res.status(404).json({mess: 'môn học đã tồn tại'});
        }
        else{
            var subject = new Subject(req.body);

            subject.save((err, result) => {
                if(err) return res.status(404).json({mess: err});

                return res.status(201).json(result);
            })
        }
    })
}

const getSubjectByStudentId = (req, res, next) => {
    Student.findOne({id: req.params.id}, (err, student) => {
        if(err) return res.status(404).json({mess:err});

        if(!student){
            return res.status(404).json({mess: "Không tìm thấy sinh viên"});
        }
        else{
            Subject.find({idSubject: {$in: student.subjects}}, 'id idSubject name type number teacherName', (err, subjects) => {
                if(err) return res.status(404).json({mess: err})

                return res.status(200).json(subjects);
            })
        }
    })
}

module.exports = {
    addToSubjectWithUserId,
    changeSubject,
    getSubjects,
    addSubject,
    getSubjectByStudentId
}