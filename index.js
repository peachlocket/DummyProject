const express = require('express');
const bodyparser = require('body-parser');
const consolidate = require('consolidate');
const app = express();

app.engine('html', consolidate.nunjucks);
app.set('views', './views');
app.use(bodyparser.urlencoded({extended: true}));
app.use('/static', express.static('./static'));

app.get('/', function(req, res){
  var username = req.query.username;
  if(!username)
    username = "Anonymous";
  res.render('index.html',{
    username: username
  });
});

app.get('/profile/:username', function(req, res){
  var username = req.params.username;
  res.render('profile.html', {
    username: username
  });
});

app.post('/submit', function(req, res){
  var username = req.body.username;
  if(username){
    var toprofile = "/profile/" + username;
    console.log(toprofile);
    res.redirect(toprofile);
  }else
    res.redirect('/');
});

app.listen(3000, function() {
	console.log('<<Long Exam 2>> Server is now running at port 3000');
});
