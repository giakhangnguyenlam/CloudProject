const Student = require('../schemas/StudentSchema');

var login = (req, res, next) => {
    Student.findOne({$and:[{username: req.body.username}, {password: req.body.password}]}, (err, student) => {
        if(err) return res.status(404).json({err: mess});
        if(student){
            return res.status(200).json({mess: 'Login successfully'});
        }
        else{
            return res.status(404).json({mess: 'Username or password is incorrect'});
        }
    })
}

var signup = (req, res, next) => {
    Student.findOne({username: req.body.username}, (err, student) => {
        if(err) return res.status(404).json({mess:err});
        if(student){
            return res.status(404).json({mess: 'Student is already existed'});
        }
        else{
            var student = new Student(req.body);
            student.save((err, result) => {
                if(err) return res.status(404).json({mess: err});
                return res.status(201).json(student);
            })
        }
    })
}

module.exports = {
    login,
    signup
}