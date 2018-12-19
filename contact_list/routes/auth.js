var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

mongoose.connect('mongodb://127.0.0.1:27017/signUp_db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  passwordConf: {
    type: String
  }
});

var User = mongoose.model('myuser', userSchema);

router.route('/signUp')
	.post((req, res, next) => {
	 var email = req.body.email;
	 var username = req.body.username;
	 var password = req.body.password;
 	 var passwordConf = req.body.passwordConf;

	 var newuser = new User();
	 newuser.email = email;
	 newuser.username = username;
	 newuser.password = password;
	 newuser.passwordConf = passwordConf;
	 newuser.save(function(err, savedUser) {
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		res.send('Signup Successful');
	});
});


router.route('/login')
	.post((req, res) => {
	 var username = req.body.username;
	 var password = req.body.password;

	 User.findOne({username: username, password: password}, function(err, user) {
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		if(!user) {
			return res.status(404).send();
		}
		req.session.user = user;
		res.send('Login Successful');
	});
}); 

//Session-based authentication was used for login authentication 
router.route('/dashboard')
	.get((req, res) => {
	 if(!req.session.user) {
		return res.status(401).send();
	 }
	 return res.status(200).send("Welcome to super-secret API")
})

module.exports = router;

