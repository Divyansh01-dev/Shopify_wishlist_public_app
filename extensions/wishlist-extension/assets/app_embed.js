function initWishlistButton() {
  const btn = document.querySelector(".ws-wishlist-btn");
  if (!btn || btn.dataset.initialized) return;

  btn.dataset.initialized = "true";

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    console.log("btn", btn.dataset);

    const productId = btn.dataset.productId;
    const variantId = btn.dataset.variantId;
    const title = btn.dataset.productTitle;
    const handle = btn.dataset.productHandle;

    const customerId = window.WishlistCustomerId || null;
    console.log("customerId", customerId);

    if (!productId) {
      console.error("Product ID missing");
      showPopup("Product not found");
      btn.disabled = false;
      return;
    }


    if (!customerId) {
      console.log("No login user — storing wishlist locally");

      const wishlistKey = "guest_wishlist";
      const existingWishlist =
        JSON.parse(localStorage.getItem(wishlistKey)) || [];


      const alreadyAdded = existingWishlist.some(
        (item) => item.productId === productId && item.variantId === variantId
      );

      if (!alreadyAdded) {
        existingWishlist.push({ productId, variantId, title, handle });
        localStorage.setItem(wishlistKey, JSON.stringify(existingWishlist));
        showPopup("Added to wishlist (local)");
      } else {
        showPopup("Already in wishlist");
      }

      setTimeout(() => (btn.disabled = false), 800);
      return; 
    }

   
    try {
      const response = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          productId,
          variantId,
          title,
          handle,
        }),
      });

      const data = await response.json();
      console.log("Wishlist API →", data);

      if (response.ok) {
        showPopup("Added to wishlist");
      } else {
        showPopup(data.message || "Failed to add");
      }
    } catch (err) {
      console.error(err);
      showPopup("Server error");
    }

    setTimeout(() => (btn.disabled = false), 800);
  });
}

document.addEventListener("DOMContentLoaded", initWishlistButton);
document.addEventListener("shopify:section:load", initWishlistButton);

function showPopup(message) {
  const popup = document.getElementById("popup-message");
  if (!popup) return;

  popup.innerHTML = `<h1>${message}</h1>`;
  popup.classList.add("show");

  setTimeout(() => popup.classList.remove("show"), 2000);
}
