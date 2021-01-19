/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');   

function linkAction(){
  /*Active link*/
  navLink.forEach(n => n.classList.remove('active'));
  this.classList.add('active');
  
  /*Remove menu mobile*/
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

/*SCROLL HOME*/
sr.reveal('.home__title',{}); 
sr.reveal('.button',{delay: 200}); 
sr.reveal('.home__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 

/*SCROLL ABOUT*/
sr.reveal('.about__img',{}); 
sr.reveal('.about__subtitle',{delay: 400}); 
sr.reveal('.about__text',{delay: 400}); 

/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle',{}); 
sr.reveal('.skills__text',{}); 
sr.reveal('.skills__data',{interval: 200}); 
sr.reveal('.skills__img',{delay: 600});

/*SCROLL WORK*/
sr.reveal('.work__img',{interval: 200}); 

/*SCROLL CONTACT*/
sr.reveal('.contact__input',{interval: 200});

// Firebase 
 
window.onload = function () {

	const form = document.getElementById('forms');
	const name = document.getElementById('a');
	const email = document.getElementById('b');
	const massege = document.getElementById('c');

    // firebase stuff
    var firebaseConfig = {
        apiKey: "AIzaSyC2iH9fmIbzs3Ty265IGWF6jXGCNwjuNpI",
        authDomain: "contact-form-82723.firebaseapp.com",
        projectId: "contact-form-82723",
        storageBucket: "contact-form-82723.appspot.com",
        messagingSenderId: "956392118557",
        appId: "1:956392118557:web:4039c67da9ecb8dd1469f4",
        measurementId: "G-07S2W293JX"
      };
	

	firebase.initializeApp(firebaseConfig);
	var firestore = firebase.firestore();

	const db = firestore.collection("contactData");

	form.addEventListener('submit', (e)=>{
		e.preventDefault();

		const userName = name.value.trim();
		const userEmail = email.value.trim();
		const userMessage = massege.value.trim();

		if (checkInputs()) {

			db.doc().set({
				name: userName,
				email: userEmail,
				message: userMessage
			}).then(() => {
				console.log("Data Saved");
				window.alert("Your Message Send Successfully");
			}).catch((err) => {
				console.log(err);
			});

			document.getElementById('a').value = "";
			document.getElementById('b').value = "";
			document.getElementById('c').value = "";
		} else {
			console.log(`Something Wrong....`);
		}
	});

	function checkInputs() {

		const userName = name.value.trim();
		const userEmail = email.value.trim();
		const userMassage = massege.value.trim();

		let allRight = true;

		if (userName === "") {
			showError(name);
			allRight = allRight && false;
		} else {
			setSuccess(name);
			allRight = allRight && true;
		}

		if (userEmail === "") {
			showError(email);
			allRight = allRight && false;
		} else {
			setSuccess(email);
			allRight = allRight && true;
		}

		if (userMassage === "") {
			showError(massege);
			allRight = allRight && false;
		} else {
			setSuccess(massege);
			allRight = allRight && true;
		}

		return allRight;
	}

	function setSuccess(input) {
		const parent = input.parentElement;
		const small = parent.querySelector('small');

		small.style.opacity = '0';
	}

	function showError(input) {
		console.log(input.parentElement)
		const parent = input.parentElement;
		const small = parent.querySelector('small');

		small.style.opacity = '1';
	}
}


