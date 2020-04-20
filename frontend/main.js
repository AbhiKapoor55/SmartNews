
const log = console.log

function authenticateUser(e){
	const emailEntered = document.getElementById("inputEmail").value.trim()
	const passwordEntered = document.getElementById("inputPassword").value.trim()

	console.log("Reached1")

	const userData = {
		email: emailEntered, 
		password: passwordEntered
	};

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

function loadNews(e){
	const newsApi = "http://newsapi.org/v2/top-headlines?country=ca&apiKey=217faaf5e7fc416cbba9c1d510d7a3a5"

	fetch(newsApi).then(res => {
		return res.json()
	}).then(resp => {
		console.log(resp.articles[0])
		const displayImageOne = document.getElementsByClassName("item-box-blog")[0]
		const displayImageTwo = document.getElementsByClassName("item-box-blog")[1]
		const displayImageThree = document.getElementsByClassName("item-box-blog")[2]
		displayImage(displayImageOne, resp.articles[0])
		displayImage(displayImageTwo, resp.articles[1])
		displayImage(displayImageThree, resp.articles[2])
	})

}

function displayImage(parentElement, image){
	
	parentElement.children[0].children[1].children[0].src=image.urlToImage
	parentElement.children[0].children[1].children[0].height="400"
	parentElement.children[0].children[1].children[0].weight="500"
	parentElement.children[1].children[0].children[0].children[0].innerText = image.title
	parentElement.children[1].children[2].children[0].innerText = image.description

	
	console.log()
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



