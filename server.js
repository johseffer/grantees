const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
let Grantee = require('./models/grantee.model');

const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(bodyParser.json());
const connectionString = "mongodb+srv://admin:admin@cluster0-agmo6.mongodb.net/grantees";
mongoose.connect(connectionString, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const granteesRoutes = express.Router();

granteesRoutes.route('/').get(function(req, res) {
  Grantee.find(function(err, grantees) {
      if (err) {
          console.log(err);
      } else {
          res.json(grantees);
      }
  });
});

app.use('/grantees', granteesRoutes);

app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});