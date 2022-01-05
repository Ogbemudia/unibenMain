const signup = document.querySelector('.signup');
const login = document.querySelector('.login');
const profile = document.querySelector('.profile');
const reset_pass = document.querySelector('.reset_pass');
const delete_user = document.querySelector('.delete_user');
const update_user = document.querySelector('.update_user');



signup.addEventListener('click', () => { location.href = "./registration.html" });
login.addEventListener('click', () => { location.href = "./login.html" });
profile.addEventListener('click', () => { location.href = "./profile.html" });
reset_pass.addEventListener('click', () => { location.href = "./rest_pass.html" });
delete_user.addEventListener('click', () => { location.href = "./delete_user.html" });
update_user.addEventListener('click', () => { location.href = "./update_user.html" });