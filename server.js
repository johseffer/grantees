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
connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
})

const granteesRoutes = express.Router();

granteesRoutes.route('/').get(function (req, res) {
  Grantee.find(function (err, grantees) {
    if (err) {
      console.log(err);
    } else {
      res.json(grantees);
    }
  });
});

granteesRoutes.route('/:id').get(function (req, res) {
  let id = req.params.id;
  Grantee.findById(id, function (err, grantee) {
    res.json(grantee);
  });
});

granteesRoutes.route('/create').post(function (req, res) {
  let grantee = new Grantee(req.body);
  grantee.save()
    .then(todo => {
      res.status(200).json({ 'grantee': 'grantee added successfully' });
    })
    .catch(err => {
      res.status(400).send('adding new grantee failed');
    });
});

granteesRoutes.route('/update/:id').post(function (req, res) {
  Grantee.findById(req.params.id, function (err, grantee) {
    if (!grantee)
      res.status(404).send("data is not found");
    else
      grantee.name = req.body.name;
    grantee.cpfCnpj = req.body.cpfCnpj;
    grantee.bank = req.body.bank;
    grantee.agency = req.body.agency;
    grantee.agencyDigit = req.body.agencyDigit;
    grantee.account = req.body.account;
    grantee.accountType = req.body.accountType;
    grantee.accountDigit = req.body.accountDigit;
    grantee.status = req.body.status;
    grantee.save().then(grantee => {
      res.json('Grantee updated!');
    })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

granteesRoutes.route('/delete').post(function (req, res) {
  Grantee.deleteMany(
    {
      _id: {
        $in: req.body.ids
      }
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.use('/grantee', granteesRoutes);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});