// ===============================
// GLOBAL USER VARIABLE
// ===============================
var userStatus = "guest";


// ===============================
// NAVIGATION FUNCTIONS
// ===============================
function exploreBooks() {
  window.location.href = "products.html";
}


// ===============================
// VIEW PRODUCT (DYNAMIC)
// ===============================
function viewProduct(book) {

  if (!book) {
    console.error("Book object missing ❌");
    return;
  }

  // Store selected product globally (IMPORTANT)
  localStorage.setItem("selectedProduct", JSON.stringify(book));

  dataLayer.push({
    event: "view_item",
    ecommerce: {
      item_name: book.name,
      price: book.price,
      category: "books"
    }
  });

  window.location.href =
    "product-detail.html?name=" + encodeURIComponent(book.name) +
    "&price=" + encodeURIComponent(book.price) +
    "&img=" + encodeURIComponent(book.img);
}


// ===============================
// ADD TO CART (DYNAMIC)
// ===============================
function addToCart(book) {

  // If book not passed → get from localStorage
  if (!book) {
    book = JSON.parse(localStorage.getItem("selectedProduct"));
  }

  dataLayer.push({
    event: "add_to_cart",
    ecommerce: {
      item_name: book.name,
      price: book.price,
      category: "books"
    },
    user: {
      user_type: userStatus
    }
  });

  alert("Added to cart");
}


// ===============================
// PURCHASE (DYNAMIC)
// ===============================
function buyNow(book) {

  if (!book) {
    book = JSON.parse(localStorage.getItem("selectedProduct"));
  }

  dataLayer.push({
    event: "purchase",
    ecommerce: {
      item_name: book.name,
      price: book.price,
      category: "books"
    },
    user: {
      user_type: userStatus
    }
  });

  alert("Purchase initiated");
}


// ===============================
// FORM SUBMIT (WITH DATA)
// ===============================
function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;

  dataLayer.push({
    event: "form_submit",
    user_data: {
      name: name,
      email: email
    }
  });

  alert("Form submitted");
}

function trackBtn1() {
  dataLayer.push({
    event: "btn1",
    cta_text: "Explore Books"
  });
}

function trackBtn2() {
  dataLayer.push({
    event: "btn2",
    cta_text: "Buy Now",
    section_name: "Hero Banner"
  });
}
// ===============================
// CONSENT FUNCTIONS
// ===============================

// Accept All
function acceptAll() {
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted'
  });

  document.cookie = "consent_status=accepted; path=/";

  dataLayer.push({
    event: "consent_update",
    analytics_storage: "granted",
    ad_storage: "granted"
  });

  localStorage.setItem("analyticsConsent", true);
  localStorage.setItem("adsConsent", true);

  hideBanner();
}


// Reject All
function rejectAll() {
  gtag('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  document.cookie = "consent_status=rejected; path=/";

  dataLayer.push({
    event: "consent_update",
    analytics_storage: "denied",
    ad_storage: "denied"
  });

  localStorage.setItem("analyticsConsent", false);
  localStorage.setItem("adsConsent", false);

  hideBanner();
}


// Save Preferences
function savePreferences() {
  const analytics = document.getElementById("analyticsConsent")?.checked;
  const ads = document.getElementById("adsConsent")?.checked;

  gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: ads ? 'granted' : 'denied',
    ad_user_data: ads ? 'granted' : 'denied',
    ad_personalization: ads ? 'granted' : 'denied'
  });

  document.cookie =
    "consent_status=" + (analytics || ads ? "accepted" : "rejected") + "; path=/";

  dataLayer.push({
    event: "consent_update",
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: ads ? "granted" : "denied"
  });

  localStorage.setItem("analyticsConsent", analytics);
  localStorage.setItem("adsConsent", ads);

  hideBanner();
}


// ===============================
// BANNER CONTROL
// ===============================
function hideBanner() {
  const banner = document.getElementById("consent-banner");
  if (banner) banner.style.display = "none";
}


// ===============================
// LOAD CONSENT STATE
// ===============================
document.addEventListener("DOMContentLoaded", function () {

   sessionStorage.setItem("sessionUser", "active");

  const banner = document.getElementById("consent-banner");

  const analytics = localStorage.getItem("analyticsConsent");
  const ads = localStorage.getItem("adsConsent");

  if (analytics !== null && ads !== null) {

    gtag('consent', 'update', {
      analytics_storage: analytics === "true" ? 'granted' : 'denied',
      ad_storage: ads === "true" ? 'granted' : 'denied',
      ad_user_data: ads === "true" ? 'granted' : 'denied',
      ad_personalization: ads === "true" ? 'granted' : 'denied'
    });

    hideBanner();

  } else {
    if (banner) banner.style.display = "block";
  }
});
