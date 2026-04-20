// ===============================
// EXISTING FUNCTIONS
// ===============================

function exploreBooks() {
  window.location.href = "products.html";
}

function viewProduct(book) {

  // 🔴 Safety check
  if (!book) {
    console.error("Book object missing ❌");
    return;
  }

  console.log("Book clicked:", book); // debug

  // Push event to GTM
  if (window.dataLayer) {
    dataLayer.push({
      event: "view_item",
      item_name: book.name
    });
  }

  // Redirect safely
  window.location.href =
    "product-detail.html?name=" + encodeURIComponent(book.name) +
    "&price=" + encodeURIComponent(book.price) +
    "&img=" + encodeURIComponent(book.img);
}

function addToCart() {
  if (window.dataLayer) {
    dataLayer.push({ event: "add_to_cart" });
  }
  alert("Added to cart");
}

function buyNow() {
  if (window.dataLayer) {
    dataLayer.push({ event: "purchase" });
  }
  alert("Purchase initiated");
}

function submitForm(event) {
  event.preventDefault();

  if (window.dataLayer) {
    dataLayer.push({ event: "form_submit" });
  }

  alert("Form submitted");
}

// ===============================
// CONSENT FUNCTIONS
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
// LOAD CONSENT STATE
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
    if (banner) banner.style.display = "block";
  }
};
