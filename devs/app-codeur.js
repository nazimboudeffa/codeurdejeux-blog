const fs = require('fs')
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const showdown  = require('showdown')

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/public'))
app.use('/', express.static('public'))

const contentFolder = './content/';

function processFolder(folder){
  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  });
}

/**
  Sync helps return an array or it doesn't return without sync
*/
function processFolderSync(folder){
  var files = fs.readdirSync(folder);
  return files;
}

function processFile(file) {
  console.log(file)
  var content
  fs.readFile(file, (err, data) => {
    if (err) {
        throw err
    }
    console.log(data)
    content = data
  });
  return content
}

function processFileSync(file){
  var data = fs.readFileSync(file, 'utf8');
  return data
}

var converter = new showdown.Converter()
var text      = '# hello, devs!'
var html      = converter.makeHtml(text)

app.use(express.static('./devs/public/content'));

app.get('/hello', function (req, res) {
  res.send(html)
})

app.get('/', function (req, res) {
  res.render('index.ejs')
})

app.get('/:topic/:article', function (req, res) {
  var content = processFileSync('./devs/content/articles/' + req.params.topic + '/' + req.params.article + '.md')
  //console.log(content)
  var result = converter.makeHtml(content)
  //console.log(result)
  res.send(result)
})

let port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
