'use strict'
"The main server file for Breeze."

const port = 5000;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); 
const app = express();
app.use(bodyParser());
app.use(cookieParser());

const users = [] 

app.get('/', (req, res) => {
    app.use(express.static("../frontend"));
    res.sendFile(path.resolve('../frontend/index.html'));
});

app.post('/make-new-user', async (req, res) => {
	try {
		const salt = await bcrypt.genSalt() 
		const hashedPassword = await bcrypt.hash(req.body.password, salt)
		// console.log("Salt is " + salt)
		// console.log("HashedPassword is " + hashedPassword)
		const user = { username: req.body.username, password: hashedPassword} 
		users.push(user)
		res.status(201).send()
	} catch {
		res.status(500).send()
	}
})

app.post('/login', async (req, res) => {
	const user = users.find(user => user.username === req.body.username)

	if(user == null){
		return res.status(400).send({})
	}

	try {
		if(await bcrypt.compare(req.body.password, user.password)){
			res.send({"Success": 1})
		} else {
			res.send({"Success": 0})
		}

	} catch {
		res.status(500).send({})
	}
	
		
})




module.exports = app;

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
});
