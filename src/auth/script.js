const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
const signUpForm = document.querySelector('.sign-up form');
const signInForm = document.querySelector('.sign-in form');

signUpForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    window.location.href = 'http://localhost:3001'; 
});
signInForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    window.location.href = 'http://localhost:3001'; 
});