const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const { Container, initializeContainer } = require('./utility/container');
const  bodyParser = require('body-parser')
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html'); 

const ENTITIES_DIR = path.join(__dirname, 'entities');

let container = new Container();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/add', (req, res) => {
  const instance = req.body.instance;
  const name = req.body.name;
  const result = container.addEntityInstance(name, instance);
  if (result && result.error){
    return res.status(400).send(result.error)
  }
  return res.status(200).send('Ok');
});

app.get('/names', (req, res) => {
  res.send(container.getEntitiesNames());
});

app.get('/instances', (req,res) => {
  const entityName = req.query.name;
  res.send({
    entityInstances: container.getEntityInstances(entityName),
    entityProps: container.getEntityProps(entityName)
  })
});

app.get('/', (req, res) => {
 res.sendFile(HTML_FILE);
}); 

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});

initializeContainer(container, ENTITIES_DIR).then(
  c => {
    console.log("Container initialized");
  }
)
