var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require('./routes')(app);

app.listen(PORT, () => {
  console.log('App listening at http://localhost:' + PORT);
});