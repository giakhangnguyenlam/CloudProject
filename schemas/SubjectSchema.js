const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var SubjectSchema = new Schema({
    id: Number,
    idSubject: Number,
    name: String,
    type: String,
    number: Number,
    teacherName: String,
    studentId: [{
        type: Schema.Types.Number,
        ref: 'StudentSchema'
    }]
})

autoIncrement.initialize(mongoose.connection);
SubjectSchema.plugin(autoIncrement.plugin, {model : 'SubjectSchema', field: "id"});

var SubjectSchema = mongoose.model('SubjectSchema', SubjectSchema);

module.exports = SubjectSchema;