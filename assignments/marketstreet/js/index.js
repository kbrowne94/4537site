const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

let val = parseJwt(localStorage.getItem('token'));
console.log(val.user);

async function fetchItems() {

  // let items = JSON.parse(localStorage.getItem('items'));
  let  itemList =document.getElementById('cardTable');
  itemList.innerHTML = '';
  const response = await fetch('https://infinite-fortress-97833.herokuapp.com/api/v1/items', {
    method: 'get',
    headers: {'Authorization': localStorage.getItem('token')}
  });

  const data_res = await response.json();
  let node = document.getElementById('cardTable');
  node.innerHTML = "";
  data_res.items.forEach(function(item) {
    let card = new ItemCard(item.id, item.category.name,  item.name, item.cost, item.description, item.url);
    card.generateCard();
  })
}

$('#all-category').click(async function (e) { 
  await fetchItems();  
});


async function fetchCategoriesforSidebar() {
  const response = await fetch('https://infinite-fortress-97833.herokuapp.com/api/v1/Categories', {
    method: 'get',
    headers: {'Authorization': localStorage.getItem('token')}
  });
  const data_res = await response.json();
  let categories = [];
  data_res.categories.forEach(function(category) {
    $('#sidebar').append(`<button class="list-group-item" id='${category.id}-sidbar'>${category.name}</button>`);
    categories.push({htmlid:`${category.id}-sidbar`, databaseid: category.id});
  });
  categories.forEach(function(category) {
    $(`#${category.htmlid}`).click( async function (e) { 
      await fetchItemsByCategory(category.databaseid);
    });
  })
 

}


async function fetchItemsByCategory(id) {
  const response = await fetch(`https://infinite-fortress-97833.herokuapp.com/api/v1/items/category/${id}`, {
    method: 'get',
    headers: {'Authorization': localStorage.getItem('token')}
  });
  const data_res = await response.json();
  console.log(data_res);
  let node = document.getElementById('cardTable');
  node.innerHTML = "";
  data_res.items.forEach(function(item) {
    let card = new ItemCard(item.id, item.category.name,  item.name, item.cost, item.description, item.url);
    card.generateCard();
  })
}


function generateDummyCards() {
  for(let i = 0; i< 5; i++) {
  let item = new ItemCard(i,'mail@mail.com','test', '$29.99', 'test');
  item.generateCard();
  }

  let create_post_button =document.getElementById('create-posting');
  create_post_button.addEventListener('click', (e) => {
    console.log('modal');
  });

  
}

class ItemCard {
  constructor(id,category, name, price, description,url) {
    this.url =url;
    this.category= category;
    this.id = id
    this.name = name;
    this.price = price;
    this.description = description;
  };
  generateCard() {
    let card = `<div class="col-lg-4 col-md-6 mb-4" id="card-${this.id}">
    <div class="card h-100">
      <a href="#"><img class="card-img-top"  src=${this.url? this.url: "http://placehold.it/700x400" } alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a id="modal-card-${this.id}" href="#">${this.name}</a>
        </h4>
        <h5>$${this.price}</h5>
        <p class="card-text"><b>${this.category}</b></p>
        <p class="card-text">${this.description}</p>
      </div>
    </div>
  </div>`;
  $('#cardTable').append(card);
  let cardModal = document.getElementById(`modal-card-${this.id}`);
  cardModal.setAttribute('data-toggle', 'collaps');
  cardModal.setAttribute('data-target', '#collapseExample');
  // cardModal.addEventListener('click' (e))

  } 
}



async function fetchData() {
  await fetchItems();
  await fetchCategoriesforSidebar();
  // generateDummyCards();
}


