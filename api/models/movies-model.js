'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    movieTitle: {
        type: String,
        required: 'Kindly enter the movie name'
    },
    releasedYear: {
        type: String,
        required: 'Kindly enter the movie released year'
    }
});

module.exports = mongoose.model('Movies', movieSchema); //movies(all small letter) will be the collection name

//var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// module.exports = mongoose.model('Movies', new mongoose.Schema({
//     movieTitle: String,
//     releasedYear: String
// }));


