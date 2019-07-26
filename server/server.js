const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const initializeContainer = require('./utility/container')
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html'); 
const ENTITIES_DIR = path.join(__dirname, 'entities');

let container;

app.use(express.static('dist'));

app.get('/api', (req, res) => {
  res.send(container.getEntitiesName());
});

app.get('/', (req, res) => {
 res.sendFile(HTML_FILE);
}); 

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});

initializeContainer(ENTITIES_DIR).then(
  c => {
    console.log("Container initialized");
    container = c
  }
)
