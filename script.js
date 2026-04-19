// ===============================
// EXISTING FUNCTIONS
// ===============================

function exploreBooks() {
  window.location.href = "products.html";
}

function viewProduct(book) {
  dataLayer.push({
    event: "view_item",
    item_name: book.name
  });

  window.location.href = `product-detail.html?name=${book.name}&price=${book.price}&img=${book.img}`;
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

// ===============================
// CONSENT FUNCTIONS (NEW)
// ===============================

function acceptConsent() {
  gtag('consent', 'update', {
    'analytics_storage': 'granted',
    'ad_storage': 'granted'
  });

  localStorage.setItem("consent", "accepted");

  const banner = document.getElementById("consent-banner");
  if (banner) banner.style.display = "none";
}

function rejectConsent() {
  gtag('consent', 'update', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied'
  });

  localStorage.setItem("consent", "rejected");

  const banner = document.getElementById("consent-banner");
  if (banner) banner.style.display = "none";
}

// ===============================
// LOAD CONSENT STATE (VERY IMPORTANT)
// ===============================

window.onload = function () {
  const consent = localStorage.getItem("consent");
  const banner = document.getElementById("consent-banner");

  if (consent === "accepted") {
    gtag('consent', 'update', {
      'analytics_storage': 'granted',
      'ad_storage': 'granted'
    });

    if (banner) banner.style.display = "none";
  } 
  else if (consent === "rejected") {
    gtag('consent', 'update', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied'
    });

    if (banner) banner.style.display = "none";
  }
  else {
    // No choice yet → show banner
    if (banner) banner.style.display = "block";
  }
};
