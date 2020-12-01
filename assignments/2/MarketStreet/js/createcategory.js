$('#create-category').submit(async function (e) { 
  e.preventDefault();
  let name = document.getElementById("item-name-createcategory").value;
  let description = document.getElementById("descriptiontext-createcategory").value;
  
  let data = {name,description};
  data = JSON.stringify(data);
  const response = await fetch('https://infinite-fortress-97833.herokuapp.com/api/v1/category', {
    method: 'post',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') 
    }
  });
  const data_res = await response.json();
  window.location.href = "index.html"
  });