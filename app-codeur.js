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
  res.render('index', {articles : articles})
})

app.get('/faq', function (req, res) {
  res.render('faq')
})

app.get('/contact', function (req, res) {
  res.render('contact')
})

app.get('/topic/:topic', function (req, res) {
  var articles = [];
  var topics = processFolderSync('./public/content/articles/' + req.params.topic)
  for(i=0;i<topics.length;i++){
    var content = processFileSync('./public/content/articles/' + req.params.topic + '/' + topics[i])
    var result = converter.makeHtml(content)
    //articles[i] = result;
    articles.push({
      "topic" : req.params.topic,
      "title" : (topics[i].split("."))[0],
      "text" : result
    });
  }
  res.render('articles', { articles : articles })
})

app.get('/topic/:topic/:article', function (req, res) {
  var content = processFileSync('./public/content/articles/' + req.params.topic + '/' + req.params.article + '.md')
  var result = converter.makeHtml(content)
  var article = {
    "topic" : "",
    "title" : "",
    "text" : ""
  }
  article.topic = req.params.topic
  article.title = req.params.article
  article.text = result
  res.render('article', { result : article })
})

//I use 3001 because I have default apps on the port 3000 running in my server

let port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log('Example app listening on port 3001!')
})
