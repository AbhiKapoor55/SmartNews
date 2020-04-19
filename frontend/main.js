
const log = console.log

function authenticateUser(e){
	const emailEntered = document.getElementById("inputEmail").value.trim()
	const passwordEntered = document.getElementById("inputPassword").value.trim()

	console.log("Reached1")

	const userData = {
		email: emailEntered, 
		password: passwordEntered
	};

	console.log("Reached2")

	const authRequired = document.getElementById("authRequired")

	const authRequest = new Request('/login', {
		method:"post",
		body: JSON.stringify(userData),
		headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        }
	});

	fetch(authRequest).then(res => {
		if(res.status === 400){
			authRequired.innerHTML = "User Does Not Exist"
		} else {
			return res.json()
		}
	}).then(resp => {
		if(resp.Success === 1){
			authRequired.innerHTML = "Access Granted"
			authRequired.style.color = "green"
			window.location.href = '/homepage'
		} else {
			authRequired.innerHTML = "Access Denied"
			authRequired.style.color = "red"
		}
	}).catch(err => {
		console.log("Authentication Failed")
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

	const userData = {
		email: emailEntered, 
		password: passwordEntered
	};

	const authRequest = new Request('/make-new-user', {
		method:"post",
		body: JSON.stringify(userData),
		headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        }
	});

	const authRequired = document.getElementById("authRequired");

	fetch(authRequest).then(res => {
		if(res.status === 201){
			authRequired.innerHTML = "Account Created!"
		} else {
			authRequired.innerHTML = "Error Occurred"
		}
	}).catch(err => {
		console.log("Error Occurred with Signing Up User")
	})
}

function toSignup(e){
	window.location.href = '/toSignup'
}

function toLogin(e){
	window.location.href = '/toLogin'
}



