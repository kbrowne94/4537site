const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

function updatereadURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $('#updateform-img').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}

$("#image-updateform-input").change(function() {
  updatereadURL(this);
});


async function fetchCategoriesForUpdateForm() {
  const response = await fetch('https://infinite-fortress-97833.herokuapp.com/api/v1/Categories', {
    method: 'get',
    headers: {'Authorization': localStorage.getItem('token')}
  });
  const data_res = await response.json();
  let categories = [];
  data_res.categories.forEach(function(category) {
    $('#categories-updateform').append(`<option value=${category.id}>${category.name}</option>`);
    categories.push({htmlid:`${category.id}-sidbar`, databaseid: category.id});
  });
  categories.forEach(function(category) {
    $(`#${category.htmlid}`).click( async function (e) { 
      await fetchItemsByCategory(category.databaseid);
    });
  })
}

async function fetchItemInfo(id, userid) {
  const response = await fetch(`https://infinite-fortress-97833.herokuapp.com/api/v1/item/${id}`, {
    method: 'get',
    headers: {'Authorization': localStorage.getItem('token')}
  });
  const data_res = await response.json();
  console.log(data_res);
  if(data_res.user.userid !== userid){
    console.log("blah");
    alert('forbidden');
    window.location.href = "index.html";
  } else {
    $("#item-name-updateform").val(data_res.name);
    $("#item-name-updateform").attr("itemID", data_res.id);
    $("#item-name-updateform").attr("sold", data_res.sold);
    $("#item-name-updateform").attr("uri", data_res.uri);
    $("#item-name-updateform").attr("url", data_res.url);

    $("#updateform-img").attr("src",data_res.url);
    $("#categories-updateform").val(data_res.category.categoryid);
    $("#cost-updateform").val(data_res.cost);
    $("#descriptiontext-updateform").val(data_res.description);
    $('#update-post').submit(async function (e) { 
      e.preventDefault();
      let name = document.getElementById("item-name-updateform").value;
      let categoryid = document.getElementById("categories-updateform").value;
      categoryid = parseInt(categoryid);
      let cost = document.getElementById("cost-updateform").value;
      cost = parseFloat(cost); 
      let description = document.getElementById("descriptiontext-updateform").value;
      let url = $('#updateform-img').attr("src");
      let id = $('#item-name-updateform').attr("itemID");
      let sold = $('#item-name-updateform').attr("sold");
      sold = sold == 'true';
      let uri = $('#item-name-updateform').attr("uri");
      id = parseInt(id);
      let data = {id, name,description, cost, categoryid, url, sold, uri};

      console.log(data);
      data = JSON.stringify(data);
      const response = await fetch(`https://infinite-fortress-97833.herokuapp.com/api/v1/item/${id}`, {
        method: 'PATCH',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') 
        }
      });
      const data_res = await response.json();
      window.location.href = "profile.html";
      });

  }

}

async function loadDataUpdateForm() {
  let val = parseJwt(localStorage.getItem('token'));
  var qs = window.location.search;
  const urlParams = new URLSearchParams(qs);
  const itemid = urlParams.get('id');
  await fetchCategoriesForUpdateForm();
  await fetchItemInfo(itemid,  val.user.id);

}