const router = require('express').Router();
let User = require('../models/user.model');

//FIRST END POINT
// Handles incoming HTTP GET requests on the /users/ URL path
//Users.find() is called to get a list of all the users from the database
//Results of user.find are returned in JSON format
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//SECOND END POINT
//Handles incoming HTTP POST requests 
//New username is a part of the request body
//New user is saved to db with newUser.save()
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
