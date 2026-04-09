function exploreBooks() {
  window.location.href = "products.html";
}

function viewProduct() {
  window.location.href = "product-detail.html";
}

function addToCart() {
  alert("Added to cart");
}

function buyNow() {
  alert("Purchase initiated");
}

function submitForm(event) {
  event.preventDefault();
  alert("Form submitted");
}