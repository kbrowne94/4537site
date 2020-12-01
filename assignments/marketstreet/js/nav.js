const parseJwtnav = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

let navval = parseJwtnav(localStorage.getItem('token'));
console.log(navval.user);
if(navval.user.admin == true) {
  console.log('blah');
  let content = `<li class="nav-item">
  <a class="nav-link" href="createcategory.html">create category
  </a>`
  $("#nav").append(content);
  
}