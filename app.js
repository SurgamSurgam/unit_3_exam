const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const researchers = require('./routes/researchers.js');
const species = require('./routes/species.js');
const animals = require('./routes/animals.js');
const habitats = require('./routes/habitats.js');
const taggings = require('./routes/taggings.js');
const sightings = require('./routes/sightings.js');

app.use('/researchers', researchers);
app.use('/species', species);
app.use('/animals', animals);
app.use('/habitats', habitats);
app.use('/taggings', taggings);
app.use('/sightings', sightings);

// app.get('/', (req, res) => {
//   res.send('This is the Discovery Channel homepage')
// })

app.get('/*', (req, res, next) => {
  res.status(404).json({
    status: 'error'
  });
})

app.listen(port, () => {
  console.log(`You are listening to port ${port}` );
})
