export function isAdmin() {
  const BASE64_ADMIN_ROLE = import.meta.env.BASE64_ADMIN_ROLE;
  console.log(import.meta.env);
  console.log(localStorage.getItem("role"), BASE64_ADMIN_ROLE);
  return localStorage.getItem("role") == "VVNFUg==";
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function setCookie(name,value,hour) {
  var expires = "";
  if (hour) {
    var date = new Date();
    date.setTime(date.getTime() + (hour*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export function setToken() {
  const tokenJwt = getCookie('jwt');
  const options = {};
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `${tokenJwt}`);
  return options;
}
