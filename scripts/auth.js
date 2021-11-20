//Add admin with Oncall cloud function
const adminForm = document.querySelector(".admin-actions");
// listen for auth status changes
adminForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const adminEmail=document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({
    email:adminEmail
  }).then(result =>{
    console.log(result);
  });
});
//change per cuuntry
auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult =>{
      user.admin = idTokenResult.claims.admin;
    });
    //Create for admin 
    db.collection('tips/Countries/Mexico').onSnapshot(snapshot => {
      document.getElementById('countries').value = selectedCountry;
      setupTips(snapshot.docs);
      setupUI(user);
      userAux = user;
    }, err => console.log(err.message));
  } else {
    setupUI();
    setupTips([]);
  }
});

//listen for country changes

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //change country depending on it
  //REQUIRES country selector
  db.collection('tips/Countries/'+selectedCountry).add({
    title: createForm.title.value,
    content: createForm.content.value,
    owner: userAux.uid
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    
    return db.collection('users').doc(cred.user.uid).set({
      strikes: 0
    });
  }).then(() => {
          // close the signup modal & reset form
          const modal = document.querySelector('#modal-signup');
          M.Modal.getInstance(modal).close();
          signupForm.reset();
          signupForm.querySelector('.error').innerHTML = '';
      }).catch(err =>{
            console.log('its here');
          signupForm.querySelector('.error').innerHTML = err.message; 
  });
});
//then(() => {
  //firebase.auth().currentUser.sendEmailVerification()

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
  
});


//event listeners for each country
  //Mexico

  const mexico = document.querySelector('#mexico');
  mexico.addEventListener('click', (e) => {
    e.preventDefault();
    selectedCountry = "Mexico";
    countrySelection(selectedCountry);
    mexico.parentElement.classList.add("active");
  });
  const usa = document.querySelector('#usa');
  usa.addEventListener('click', (e) => {
    e.preventDefault();
    selectedCountry = "Usa";
    countrySelection(selectedCountry);
    usa.parentElement.classList.add("active");
  });
  const poland = document.querySelector('#poland');
  poland.addEventListener('click', (e) => {
    e.preventDefault();
    selectedCountry = "Poland";
    countrySelection(selectedCountry);
    poland.parentElement.classList.add("active");
  });
  const spain = document.querySelector('#spain');
  spain.addEventListener('click', (e) => {
    e.preventDefault();
    selectedCountry = "Spain";
    countrySelection(selectedCountry);
    spain.parentElement.classList.add("active");
  }); 


  const getTipsperCountry = (country) =>{
  
    db.collection('tips/Countries/'+country).onSnapshot(snapshot => {
        if(snapshot.docs.length!=0){
          setupTips(snapshot.docs);
        }
        else{
          setupTips('Add a new tip!');
        }
      }, err => console.log(err.message));
    /*} else {
      setupUI();
      setupTips([]);
    }*/
  
  }