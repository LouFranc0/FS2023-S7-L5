function createProduct(form) {
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

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
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
      console.log("Nuovo prodotto creato:", data);
      window.location.href = "index1.html";
    })
    .catch((error) => console.error(error));
}
