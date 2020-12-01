const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

async function fetchUserItems(id) {
  const response = await fetch(`https://infinite-fortress-97833.herokuapp.com/api/v1/items/user/${id}`, {
    method: 'get',
    headers: {'Authorization': localStorage.getItem('token')}
  });
  const data_res = await response.json();
  let items = data_res.items;
  console.log(items);
  items.forEach(function(item){
    let content = new UserItem(item);
    content.generateListItem();
  })
  

}

class UserItem {
  constructor(item) {
    this.id = item.id;
    this.name = item.name;
  };
  generateListItem() {
    let item = `<li class = "list-group-item">
     <div class="row">
       <h4 class="col-sm-6">${this.name}</h4>
       <div class="col-sm-3">
         <a id='${this.id}-update'class="btn btn-warning"href="updateitem.html?id=${this.id}">update</a>
       </div>
       <div class="col-sm-3">
         <button id='${this.id}-delete'class="btn btn-danger">delete</button>
       </div>
     </div>            
    </li>`;
    $("#userPostList").append(item);
    $(`#${this.id}-delete`).click(async function(e) { 
      e.preventDefault();
      let dbid = this.id.split('-');
      const response = await fetch(`https://infinite-fortress-97833.herokuapp.com/api/v1/item/${dbid[0]}`, {
        method: 'delete',
        headers: {'Authorization': localStorage.getItem('token')}
      });
      window.location.reload();

      
    });
  }
  
}


const fetchProfileData = async() => {
  let val = parseJwt(localStorage.getItem('token'));
  userinfo = val.user;
  let user = `<div class="col-lg-12" id="profile-card-${userinfo.id}">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">
            <p>username:</p>
          </h5>
          <p id="profile-card-${val.id}">${userinfo.username}</p>
          <h5>Email:</h5> 
          <p>${userinfo.email}</p>
        </div>
      </div>
    </div>`;
  $('#stuff').append(user);
  await fetchUserItems(userinfo.id);
};

