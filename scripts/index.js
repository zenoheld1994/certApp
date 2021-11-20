// DOM elements
const tipList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const countries = document.querySelectorAll('.country');
const createTip = document.querySelectorAll('.admin');

const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div class="pink-text">${user.admin ? 'Admin' : ''} </div>`
        ;
      accountDetails.innerHTML = html;
    });
    if(user.admin==true)
      createTip.forEach(item => item.style.display = 'block');
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    createTip.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};
const countrySelection = (country) =>{
  //query the desiredCountry
  //console.log(country);
  document.getElementById('countries').value = country;
  countries.forEach(country => country.classList.remove("active"));
  getTipsperCountry(country);
}
// setup tips
const setupTips = (data) => {
  if(typeof data==='string'){
    tipList.innerHTML = '<h5 class="center-align">'+data+'</h5>';
  }
  else if (data.length) {
    let html = '';
    data.forEach(doc => {
      const tip = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${tip.title} </div>
          <div class="collapsible-body white"> ${tip.content} </div>
        </li>
      `;
      html += li;
    });
    tipList.innerHTML = html
  } else {
    tipList.innerHTML = '<h5 class="center-align">Login to view tips</h5>';
  }
  

};



// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});