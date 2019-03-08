'use strict';

var Movie = require('../models/movies-model');

module.exports = {

    getMovies: function(req,res){
        Movie.find({"movieTitle":{$ne:null}}, function(err, movies){
            if(err){
                res.status(500).json(err).end();
                return;
            }

            res.json({
                allMovies : movies
            }).end();
        });
    },

    createMovie: function(req,res){
        var movie = new Movie(req.swagger.params.movieDetails.value.movieDetail);
        movie.save(function(err){
            if(err){
                res.status(500).json(err).end();
                return;
            }

            res.json({
                movieDetail: movie
            }).end();
        })
    }
}