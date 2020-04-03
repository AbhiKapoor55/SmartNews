const log = console.log


function authenticate(e){
	console.log("Authenticating...")
	const emailEntered = document.getElementById("inputEmail").value.trim()
	const passwordEntered = document.getElementById("inputPassword").value.trim()
	console.log(emailEntered + "    " + passwordEntered)

	const userData = {
		username: emailEntered, 
		password: passwordEntered
	};

	const authRequest = new Request('/login', {
		method:"post",
		body: JSON.stringify(userData),
		headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        }
	});

	fetch(authRequest).then(res => {
		return res.json()
	}).then(resp => {
		console.log(resp.Success)
	})
	
}


/*
function startFunction(e){
	console.log("Clicked! ")
	const u = "http://newsapi.org/v2/top-headlines?country=ca&apiKey=217faaf5e7fc416cbba9c1d510d7a3a5"
	fetch(u).then(res => {
		return res.json()
	}).then(resp => {
		displayResults(resp)
	}).catch(err => {
		console.log("ERROR")
	})
}

function displayResults(resp){
	console.log("You have " + resp.totalResults + " results!")
	
	console.log("---------------------------------------------")
	for(let i = 0;i<2;i++){
		console.log(resp.articles[i])
	}
	console.log("---------------------------------------------")
	
}
*/

