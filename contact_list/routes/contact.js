var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const BSON = require('bson');
var Contact = require
 
// Connection URL to mongodb
const url = 'mongodb://localhost:27017';
let db;
let id = 1
 
// Database Name in mongodb
const dbName = 'contactList_db';
 
// Connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});

// Create route
router.route('/')
  .post((req, res) => {
   db.collection('contact').insert(req.body, function(err, result) {
        console.log(result);
        res.send("Contact list added successfully");
    });
})


//Read route
router.route('/')
    .get((req, res) => {
     db.collection('contact').find({}).toArray(function(err, result) {
        console.log(result);
        res.send(result);
        })  
    })


//Route for reading by id
router.route('/:id')
    .get((req, res) => {
     let id = req.params.id;
     db.collection('contact').findOne({'_id':new BSON.ObjectID(id)}, function(err, result) {
     res.send(result);
  });
});


//Route for updating by id
router.route('/:id')
       .put((req, res) => {
        let id = req.params.id;
        let contact = req.body;
        db.collection('contact').updateOne({'_id':new BSON.ObjectID(id)}, contact, {safe:true}, function(err, result) {
        console.log(result);
        res.send(result);
  });
});


//Route for deleting by id
router.route('/:id')
      .delete((req, res) => {
  let id = req.params.id;
  db.collection('contact').remove({'_id':new BSON.ObjectID(id)}, function(err, result) {
        console.log(result);
        res.send('Contact deleted successfully');
  });
})

module.exports = router;
