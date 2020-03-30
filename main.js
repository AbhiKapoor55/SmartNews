const log = console.log


function authenticate(e){
	console.log("Authenticating...")
	const usernameEntered = document.getElementById("user").value 
	const passwordEntered = document.getElementById("pass").value

	console.log("Username: " + usernameEntered)
	console.log("Password: " + passwordEntered)
}


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



function sendMessage(e){
	var message = document.getElementsByClassName("enterMessage")[0].value;
	//console.log("SENDING MESSAGE: " + message + "...")

	const url = "/message"
	addUserMessageToDOM()
	fetch(url).then((response) => {
		//console.log(response)
		if(response.status === 200){
			//console.log("received message from server")
		} else {
			console.log("Error Occurred: Response Code was not 200 ", response.status)
		}
		return response.json()
	}).then((res) => {
	    //console.log(res)
	    wait(3000)
	    addServerMessageToDOM(res)
	}).catch((err) => {
	  console.log("There was an error, ", err)
	})
}

