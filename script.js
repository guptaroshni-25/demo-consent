// ===============================
// NAVIGATION FUNCTIONS
// ===============================

function exploreBooks() {
  window.location.href = "products.html";
}

function viewProduct(book) {

  if (!book) {
    console.error("Book object missing ❌");
    return;
  }

  dataLayer.push({
    event: "view_item",
    item_name: book.name
  });

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
// CONSENT FUNCTIONS (FIXED V2 ⭐)
// ===============================

// Accept All
function acceptAll() {
  console.log("Accept button clicked ✅");

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
  console.log("Reject button clicked ❌");

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


// Save Custom Preferences
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
// LOAD CONSENT STATE (VERY IMPORTANT ⭐)
// ===============================

document.addEventListener("DOMContentLoaded", function () {

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

    const analyticsCheckbox = document.getElementById("analyticsConsent");
    const adsCheckbox = document.getElementById("adsConsent");

    if (analyticsCheckbox) analyticsCheckbox.checked = (analytics === "true");
    if (adsCheckbox) adsCheckbox.checked = (ads === "true");

    hideBanner();

  } else {
    if (banner) banner.style.display = "block";
  }
});
