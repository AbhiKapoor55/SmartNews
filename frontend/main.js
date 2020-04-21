
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
		const panels = document.getElementsByClassName("item-box-blog")
		for(let i = 0;i<panels.length;i++){
			displayNews(panels[i], resp.articles[i])
		}
	})

}

function toHomepage(){
	window.location.href = "/homepage"
}

function toAboutDeveloper(){
	window.location.href = "/toAboutPage"
}

function displayNews(parentElement, image){

	parentElement.children[0].children[1].children[0].src=image.urlToImage
	parentElement.children[0].children[1].children[0].height="400"
	parentElement.children[0].children[1].children[0].weight="500"
	parentElement.children[1].children[0].children[0].children[0].innerText = image.title
	parentElement.children[1].children[2].children[0].innerText = image.description
	parentElement.children[0].children[0].children[0].innerText = convertDate(image.publishedAt.toString())
}

function convertDate(date){
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	const day = date.split("-")[2].substring(0,2).trim() 
	const month = parseInt(date.split("-")[1].trim()) 
	const year = date.split("-")[0] 

	return months[month] + " " + day + ", " + year
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



