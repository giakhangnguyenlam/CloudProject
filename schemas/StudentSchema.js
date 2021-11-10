const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var StudentSchema = new Schema({
    id: Number,
    name: String,
    username: String,
    password: String,
    subjects: [{
        type: Schema.Types.Number,
        ref: 'SubjectSchema'
    }]
})

autoIncrement.initialize(mongoose.connection);
StudentSchema.plugin(autoIncrement.plugin, {model : 'StudentSchema', field: "id"});

var StudentSchema = mongoose.model('StudentSchema', StudentSchema);

module.exports = StudentSchema;