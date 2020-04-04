
const log = console.log

function authenticate(e){
	const emailEntered = document.getElementById("inputEmail").value.trim()
	const passwordEntered = document.getElementById("inputPassword").value.trim()

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

	const authRequired = document.getElementById("authRequired");

	fetch(authRequest).then(res => {
		if(res.status === 400){
			authRequired.innerHTML = "User Does Not Exist"
		}
		return res.json()
	}).then(resp => {
		if(resp.Success === 1){
			authRequired.innerHTML = "Access Granted"
		} else {
			authRequired.innerHTML = "Access Denied"
		}
	})
	
}

function signupNewUser(e){
	const emailEntered = document.getElementById("inputEmail").value.trim()
	const displayNameEntered = document.getElementById("inputDisplayName").value.trim()
	const passwordEntered = document.getElementById("inputPassword").value.trim()
	const confirmPasswordEntered = document.getElementById("inputConfirmPassword").value.trim()
	const countryEntered = document.getElementById("inputCountry").value.trim()

	console.log("Email Entered: " + emailEntered)
	console.log("Display Name Entered: " + displayNameEntered)
	console.log("Password Entered: " + passwordEntered)
	console.log("Confirm Password Entered: " + confirmPasswordEntered)
	console.log("Country Entered: " + countryEntered)
}

function toSignup(e){
	window.location.href = '/toSignup'
}

function toLogin(e){
	window.location.href = '/toLogin'
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

