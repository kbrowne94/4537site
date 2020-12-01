let modal = `<div class="modal fade" id="create-posting-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Create Posting</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form role="form" id="create-post">
        <input type="hidden" name="_token" value="">
        <div class="form-group">
            <label class="control-label">Item Name</label>
            <div>
                <input type="text" id="item-name-modal" class="form-control input-lg" name="ItemName" value="" required>
            </div>
        </div>
        <div class="form-group">
          <label class="control-label">Item Image</label>
          <div>
              <img id="modal-img" src="#" alt="your image" />
              <input type="file" id="image-modal-input" class="form-control input-lg" name="ItemImage" value="">
          </div>
      </div>
        <div class="form-group">
          <label class="control-label">Item Category</label>
          <div>
              <select id="categories-modal">
              </select>
          </div>
      </div>
        <div class="form-group">
          <label class="control-label">Price</label>
          <div>
              <input type="text" class="form-control input-lg" name="Price" id="cost-modal" value="" required>
          </div>
          <div class="form-group">
            <label class="control-label">Description</label>
            <div>
              <textarea class="form-control" id="descriptiontext-modal" rows="3" required></textarea>
            </div>
      </div>

    </form>
        <div class="form-group">
            <div class="modal-footer">
              <input type="submit" class="btn btn-primary" value="create posting">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </form>
    
    </div>
    
  </div>
</div>
</div>`;
$('body').append(modal);

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $('#modal-img').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}

$("#image-modal-input").change(function() {
  readURL(this);
});


async function fetchCategories() {
  const response = await fetch('https://infinite-fortress-97833.herokuapp.com/api/v1/Categories', {
    method: 'get',
    headers: {'Authorization': localStorage.getItem('token')}
  });
  const data_res = await response.json();
  let categories = [];
  data_res.categories.forEach(function(category) {
    $('#categories-modal').append(`<option value=${category.id}>${category.name}</option>`);
    categories.push({htmlid:`${category.id}-sidbar`, databaseid: category.id});
  }); 
}



$('#create-post').submit(async function (e) { 
  e.preventDefault();
  let name = document.getElementById("item-name-modal").value;
  let categoryid = document.getElementById("categories-modal").value;
  categoryid = parseInt(categoryid);
  let cost = document.getElementById("cost-modal").value;
  cost = parseFloat(cost); 
  let description = document.getElementById("descriptiontext-modal").value;
  
  const data = {name,description, cost, categoryid};
  let fdata = new FormData();
  fdata.append('name', name);
  fdata.append('categoryid', categoryid);
  fdata.append('cost', cost);
  fdata.append('description', description);
  let file = document.getElementById('image-modal-input');
  if(file.files.length) {
    fdata.append('file', file.files[0]);
  }
  const response = await fetch('https://infinite-fortress-97833.herokuapp.com/api/v1/item', {
    method: 'post',
    body: fdata,
    headers: {'Authorization': localStorage.getItem('token')}
  });
  const data_res = await response.json();
  window.location.href = "index.html"
  });

  fetchCategories();