function initWishlistButton() {
  if (document.querySelector(".ws-wishlist-btn")) return;

  const container = document.querySelector(".product-form__buttons");
  if (!container) return;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "ws-wishlist-btn";
  btn.setAttribute("aria-label", "Add to wishlist");

  const productId = window.productId || "{{ product.id }}";
  const variantId =
    window.variantId || "{{ product.selected_or_first_available_variant.id }}";
  const handle = window.productHandle || "{{ product.handle }}";
  const title = window.productTitle || "{{ product.title | escape }}";

  btn.dataset.productId = productId;
  btn.dataset.variantId = variantId;
  btn.dataset.productHandle = handle;
  btn.dataset.productTitle = title;

  btn.textContent = "Add to wishlist";

  container.appendChild(btn);

  btn.addEventListener("click", async () => {
    btn.disabled = true;

    const customerId = window.WishlistCustomerId || null;

    if (!btn.dataset.productId) {
      console.error("Product ID missing");
      showPopup("Product not found");
      btn.disabled = false;
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          productId: btn.dataset.productId,
          variantId: btn.dataset.variantId,
          title: btn.dataset.productTitle,
          handle: btn.dataset.productHandle,
        }),
      });

      const data = await response.json();
      console.log("Wishlist API →", data);

      showPopup(
        response.ok ? "Added to wishlist" : data.message || "Failed to add",
      );
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
  let popup = document.getElementById("popup-message");
  if (!popup) return;

  popup.innerHTML = `<h1>${message}</h1>`;
  popup.classList.add("show");

  setTimeout(() => popup.classList.remove("show"), 2000);
}
