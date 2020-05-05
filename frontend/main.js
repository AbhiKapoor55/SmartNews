
const log = console.log

function authenticateUser(e){
	const emailEntered = document.getElementById("inputEmail").value.trim()
	const passwordEntered = document.getElementById("inputPassword").value.trim()

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
	activateTicker()
	document.getElementsByClassName("categoryDisplay")[0].innerText = "Home"
	const newsApi = "http://newsapi.org/v2/top-headlines?country=ca&apiKey=217faaf5e7fc416cbba9c1d510d7a3a5"

	fetch(newsApi).then(res => {
		return res.json()
	}).then(resp => {
		const panels = document.getElementsByClassName("item-box-blog")
		for(let i = 0;i<panels.length;i++){
			displayNews(panels[i], resp.articles[i])
		}
	})
}

function loadBusinessNews(e){
	console.log("business")
	document.getElementsByClassName("categoryDisplay")[0].innerText = "Business News"
	const newsApi = "http://newsapi.org/v2/top-headlines?country=ca&category=business&apiKey=217faaf5e7fc416cbba9c1d510d7a3a5"

	fetch(newsApi).then(res => {
		return res.json()
	}).then(resp => {
		const panels = document.getElementsByClassName("item-box-blog")
		for(let i = 0;i<panels.length;i++){
			displayNews(panels[i], resp.articles[i])
			console.log(resp.articles[i])
		}
	})
}

function loadEntertainmentNews(e){
	console.log("entertainment")
	document.getElementsByClassName("categoryDisplay")[0].innerText = "Entertainment News"
	const newsApi = "http://newsapi.org/v2/top-headlines?country=ca&category=entertainment&apiKey=217faaf5e7fc416cbba9c1d510d7a3a5"

	fetch(newsApi).then(res => {
		return res.json()
	}).then(resp => {
		const panels = document.getElementsByClassName("item-box-blog")
		for(let i = 0;i<panels.length;i++){
			displayNews(panels[i], resp.articles[i])
			console.log(resp.articles[i])
		}
	})
}

function loadPoliticsNews(e){
	console.log("politics")
	document.getElementsByClassName("categoryDisplay")[0].innerText = "Politics News"
	const newsApi = "http://newsapi.org/v2/top-headlines?country=ca&category=politics&apiKey=217faaf5e7fc416cbba9c1d510d7a3a5"

	fetch(newsApi).then(res => {
		return res.json()
	}).then(resp => {
		const panels = document.getElementsByClassName("item-box-blog")
		for(let i = 0;i<panels.length;i++){
			displayNews(panels[i], resp.articles[i])
			console.log(resp.articles[i])
		}
	})
}

function loadSportsNews(e){
	console.log("sports")
	document.getElementsByClassName("categoryDisplay")[0].innerText = "Sports News"
	const newsApi = "http://newsapi.org/v2/top-headlines?country=ca&category=sport&apiKey=217faaf5e7fc416cbba9c1d510d7a3a5"

	fetch(newsApi).then(res => {
		return res.json()
	}).then(resp => {
		const panels = document.getElementsByClassName("item-box-blog")
		for(let i = 0;i<panels.length;i++){
			displayNews(panels[i], resp.articles[i])
			console.log(resp.articles[i])
		}
	})
}

function loadHealthNews(e){
	console.log("health")
	document.getElementsByClassName("categoryDisplay")[0].innerText = "Health News"
	const newsApi = "http://newsapi.org/v2/top-headlines?country=ca&category=health&apiKey=217faaf5e7fc416cbba9c1d510d7a3a5"

	fetch(newsApi).then(res => {
		return res.json()
	}).then(resp => {
		const panels = document.getElementsByClassName("item-box-blog")
		for(let i = 0;i<panels.length;i++){
			displayNews(panels[i], resp.articles[i])
			console.log(resp.articles[i])
		}
	})
}


function activateTicker(){
	const tickerParent = document.getElementsByClassName("onoffswitch3")[0]
	console.log(tickerParent.children[0].children[0].children[0].children)
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

function toHomepage(){
	window.location.href = "/homepage"
	loadNews()
}

function toAboutDeveloper(){
	window.location.href = "/toAboutPage"
}



