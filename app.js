var express = require('express'),
	ejs = require('ejs'),
	//bodyParser = require('body-parser'),
	request = require('request'),
	app = express();

app.set('view engine','ejs');

// The search form will take the user to a search results page of movie listings.

app.get('/', function(req, res){
	res.render('index.ejs');
})

app.get('/search', function(req,res) {
	var query= req.query.movieTitle
	var url ='http://www.omdbapi.com/?s=' + query;

request(url, function (error, response, body) {
  if (!error) {
  	var data = JSON.parse(body);
    res.render('results.ejs',{detailList: data.Search});
    //console.log({movieList: data.Search});
  }
})
})
// Each movie link should click into a view with
//detailed information about the movie.

// From the search results page, we notice along with 
//every movie entry there is a IMDBid. Have each movie 
//link to a route like /movie/tt234323. Take the 
//parameter from that url and make an additional 
//API call to retrieve movie details related to that 
//IMDBid

app.get('/movie/:id', function(req,res) {
	var query= req.params.id
	var url ='http://www.omdbapi.com/?i='+ query;

request(url, function (error, response, body) {
  if (!error) {
  	var data = JSON.parse(body);
    res.render('detail.ejs',{detailList: data});
    //console.log({movieList: data.Search});
  }
})
})



// On the movie detail page, have an option 
//to save a movie for a watch later list.


// The final part of this project is add some kind of 
//"save" or "watch later" functionality. This can be 
//in the form of a button or link. It should make a 
//post request to a route that will store information 
//about the movies you want to watch later. 
//Hint: Use an object or array to store this information

var movieFavorites = []

app.post('/favorites', function(req, res) {
	console.log(req.body.movie);
	movieFavorites.push(req.body.movie);
	console.log(movieFavorites)
	res.redirect('/movie/:id');
});

app.get('/favorites', function(req, res) {
	res.render('favorites.ejs', {movieFavorites: data})

})



app.listen(3000);