function openBackOffice() {
  // Redirect alla pagina del back-office
  window.location.href = "index2.html";
}

function goToDetails(id) {
  window.location.assign("index4.html?id=" + id);
}

let products = [];

fetch("https://striveschool-api.herokuapp.com/api/product/", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNTgzNGZlMDMxZTAwMTliYTE5ZGMiLCJpYXQiOjE3MDIwNTgwMzYsImV4cCI6MTcwMzI2NzYzNn0.Yvjq8d8DIP_aeeUlMl7EOO8X7xAYdHG9uJnHE_iD8vs",
  },
})
  .then((response) => response.json())
  .then((data) => {
    // Logica per gestire la risposta del server
    products = data;
    data.forEach((product) => {
      const Name = product.name;
      const Description = product.description;
      const Brand = product.brand;
      const Price = product.price;
      const imageURL = product.imageUrl;
      const id = product._id;

      const template = `
              <div class="col col-4"> 
              <div class="card m-3 ">
              <img src="" class="card-img-top" alt="">
              <div class="card-body">
                  <h5 class="card-title">${Name}</h5>
                  <p class="card-text"><img src="${imageURL}" style="width: 250px"></p>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">${Description}</li>
                  <li class="list-group-item">${Brand}</li>
                  <li class="list-group-item">${Price} €</li>
              </ul>
              <div class="card-body">
                  
                  <button type="button" class="btn btn-success" onclick="goToDetails('${id}')">Scopri di più</button>
                  
              </div>
          </div>
          </div>`;

      document.querySelector(".row").innerHTML += template;
    });
  })
  .catch((error) => console.error(error));
