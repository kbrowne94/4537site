$('#signup').submit(async function (e) { 
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  const data = {username,password, email};
  let stringData = JSON.stringify(data);
  const response = await fetch('https://infinite-fortress-97833.herokuapp.com/api/v1/user', {
    method: 'post',
    body: stringData,
    headers: {'Content-Type': 'application/json'}
  });
  const data_res = await response.json();
  localStorage.setItem("token", data_res.jwt);
  window.location.href = "index.html"
  });