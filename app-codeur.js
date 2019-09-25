const fs = require('fs')
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const showdown  = require('showdown')
var articles = require('./public/content/index.js')

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/public'))
app.use('/', express.static('public'))

function processFolderSync(folder){
  var files = fs.readdirSync(folder);
  return files;
}

function processFileSync(file){
  var data = fs.readFileSync(file, 'utf8');
  return data
}

var converter = new showdown.Converter()
var text      = '# Hello, DotWeak!'
var html      = converter.makeHtml(text)

app.get('/hello', function (req, res) {
  res.send(html)
})

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/faq', function (req, res) {
  res.render('faq')
})

app.get('/contact', function (req, res) {
  res.render('contact')
})

app.get('/category/:category', function (req, res) {
  var articlesFiltered = articles.filter(obj => {return obj.category === req.params.category})
  var articlesResult = [];
  //var topics = processFolderSync('./public/content/articles/' + req.params.topic)
  for(i=0;i<articlesFiltered.length;i++){
    var content = processFileSync('./public/content/articles/' + articlesFiltered[i].category + '/' + articlesFiltered[i].file + '.md')
    var result = converter.makeHtml(content)
    //articles[i] = result;
    articlesResult.push({
      "article" : articlesFiltered[i],
      "text" : result
    });
  }
  res.render('articles', { articles : articlesResult })
})

app.get('/category/:category/:article', function (req, res) {

  var articleFiltered = articles.filter(obj => {return obj.file === req.params.article})
  var content = processFileSync('./public/content/articles/' + articleFiltered[0].category + '/' + articleFiltered[0].file + '.md')
  var result = converter.makeHtml(content)
  res.render('article', { result : {"article" : articleFiltered, "text" : result} })
})

//I use 3001 because I have default apps on the port 3000 running in my server

let port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log('Example app listening on port 3001!')
})
