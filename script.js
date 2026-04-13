function exploreBooks() {
  window.location.href = "products.html";
}

function viewProduct() {
  dataLayer.push({
    event: "view_item"
  });

  window.location.href = "product-detail.html";
}

function addToCart() {
  dataLayer.push({
    event: "add_to_cart"
  });

  alert("Added to cart");
}

function buyNow() {
  dataLayer.push({
    event: "purchase"
  });

  alert("Purchase initiated");
}

function submitForm(event) {
  event.preventDefault();

  dataLayer.push({
    event: "form_submit"
  });

  alert("Form submitted");
}
