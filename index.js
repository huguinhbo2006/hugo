var express = require('express');
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
app.listen(port);

const pruebasRuta = require('./pruebas.js');
const pruebas = app.use(pruebasRuta);

const lumiereRuta = require('./lumiere.js');
const lumiere = app.use(lumiereRuta);

const plasmexRuta = require('./plasmex.js');
const plasmex = app.use(lumiereRuta);