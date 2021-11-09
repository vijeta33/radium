const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('Hello world.This is an updated response body. ')
});

router.get('/movies', function (req, res) {
  res.send('[Jaibhim , Doctor, sooryavanshi]')
});

router.get('/movies/:movieIndex' ,function (req, res) {
let movies = ["Jaibhim" , "Doctor", "sooryavanshi"]
let value = req.params.movieIndex
if (value > movies.length){
    res.send("use a valid index")
}else{
    res.send(movies[value])
}
//let movieAtIndex = movies[index]

});

router.get('/films' , function (req, res){
    let moviesobjects = [{"Id": 1 ,"name": "The Shining"},{"Id":2 , "name":"Incendies"},{"Id":3 , "name":"Finding Demo"}]
    res.send(moviesobjects)
});

router.get('/films/:filmId', function (req, res) {
  let moviesobjects = [{"Id": 1 ,"name": "The Shining"},{"Id":2 , "name":"Incendies"},{"Id":3 , "name":"Finding Demo"}]
  let value = req.params.filmId 
  if (value >= moviesobjects.length){
      res.send("No such movie present")
    }else{
      res.send(moviesobjects[value])
    }
});

module.exports = router;