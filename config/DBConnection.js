const mongoose = require('mongoose');

(async () => {
    mongoose.connect('mongodb+srv://EC:123@cluster0.ylvzs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
})()