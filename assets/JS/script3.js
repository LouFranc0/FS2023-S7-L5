const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

getProduct(id);

function modified(id) {
  console.log(product);
  const template = `<form id="productForm">
<div class="container d-flex flex-column gap-3 mt-3 Cards">
  <div class="d-flex flex-column">
    <label for="productName" class="fs-2">Name:</label>
    <input type="text" id="productName" name="productName" value="${product.name}"required />
  </div>
  <div class="d-flex flex-column">
    <label for="productDescription" class="fs-2">Description:</label>
    <input type="text"
      id="productDescription"
      name="productDescription"
      value="${product.description}"
      required
    ></input>
  </div>
  <div class="d-flex flex-column">
    <label for="productBrand" class="fs-2">Brand:</label>
    <input type="text" id="productBrand" name="productBrand" value="${product.brand}"required />
  </div>
  <div class="d-flex flex-column">
    <label for="productImageUrl" class="fs-2">Image URL:</label>
    <input
      type="url"
      id="productImageUrl"
      name="productImageUrl"
      value="${product.imageUrl}"
      required
    />
  </div>
  <div class="d-flex flex-column">
    <label for="productPrice" class="fs-2">Price:</label>
    <input
      type="number"
      id="productPrice"
      name="productPrice"
      step="0.01"
      value="${product.price}"
      required
    />
  </div> 
  <div class="d-flex flex-column gap-4 mt-4">
    <button type="button" class="btn btn-success btn-lg" onclick="modifiedProduct(this.form, '${id}')">
      Modifica Prodotto
    </button>
    <button type="button" class="btn btn-danger btn-lg" onclick="resetForm(this.form)">Reset Form</button>
  </div>
</div>

</form>`;

  document.querySelector(".form").innerHTML += template;
}
let product = null;
function getProduct(id) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNTgzNGZlMDMxZTAwMTliYTE5ZGMiLCJpYXQiOjE3MDIwNTgwMzYsImV4cCI6MTcwMzI2NzYzNn0.Yvjq8d8DIP_aeeUlMl7EOO8X7xAYdHG9uJnHE_iD8vs",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Logica per gestire la risposta del server
      product = data;
      console.log(data);
      const Name = product.name;
      const Description = product.description;
      const Brand = product.brand;
      const Price = product.price;
      const imageURL = product.imageUrl;
      const id = product._id;

      const template = `<div class="card">
                <img src="" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${Name}</h5>
                    <p class="card-text"><img src="${imageURL}"></p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${Description}</li>
                    <li class="list-group-item">${Brand}</li>
                    <li class="list-group-item">${Price}</li>
                </ul>
                <div class="card-body">
                <button type="button" class="btn btn-primary" onclick="deleteProduct('${id}')">Elimina prodotto</button>
                <button type="button" class="btn btn-success" onclick="modified('${id}')">Modifica Prodotto</button>
                
                </div>
            </div>`;

      document.querySelector(".row").innerHTML += template;
    })
    .catch((error) => console.error(error));
}

function deleteProduct(id) {
  console.log("HERE", id);
  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNTgzNGZlMDMxZTAwMTliYTE5ZGMiLCJpYXQiOjE3MDIwNTgwMzYsImV4cCI6MTcwMzI2NzYzNn0.Yvjq8d8DIP_aeeUlMl7EOO8X7xAYdHG9uJnHE_iD8vs",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Logica per gestire la risposta del server
      console.log("prodotto cancellato:", data);
    })
    .catch((error) => console.error(error));
}

function modifiedProduct(form, id) {
  console.log(form, id);
  // Ottieni i valori inseriti nel form
  const name = form.productName.value;
  const description = form.productDescription.value;
  const brand = form.productBrand.value;
  const imageUrl = form.productImageUrl.value;
  const price = form.productPrice.value;

  // Crea l'oggetto del nuovo prodotto
  const newProduct = {
    name: name,
    description: description,
    brand: brand,
    imageUrl: imageUrl,
    price: parseFloat(price),
  };
  console.log(newProduct);

  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    method: "PUT",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNTgzNGZlMDMxZTAwMTliYTE5ZGMiLCJpYXQiOjE3MDIwNTgwMzYsImV4cCI6MTcwMzI2NzYzNn0.Yvjq8d8DIP_aeeUlMl7EOO8X7xAYdHG9uJnHE_iD8vs",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => response.json())
    .then((data) => {
      // Logica per gestire la risposta del server
      console.log("Prodotto modificato:", data);
      window.location.href = "index1.html";
    })
    .catch((error) => console.error(error));
}

function resetForm(form) {
  form.productName.value = null;
  form.productBrand.value = null;
  form.productDescription.value = null;
  form.productPrice.value = null;
  form.productImageUrl.value = null;
}
