// Change style of navbar on scroll
window.onscroll = function () {
  myFunction();
};
function myFunction() {
  var navbar = document.getElementById("myNavbar");
  if (
    document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
  ) {
    navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-black";
  } else {
    navbar.className = navbar.className.replace(
      "w3-card w3-animate-top w3-black",
      "",
    );
  }
}

function toggleFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

const productImages = {
  "StudSec T-shirt": [
    "StudSecShirtBlue_Front.jpg",
    "StudSecShirtBlue_Back.jpg",
  ],
  "StudSec Hoodie": [
    "StudSecHoodieBlue_Front.jpg",
    "StudSecHoodieBlue_Back.jpg",
  ],
  "Stickers": ["sticker.png"],
};

const imagePath = "images/products/";

function nextImage(button) {
  const itemContent = button.closest(".item_content");
  const img = itemContent.querySelector("img");
  const name = itemContent.querySelector(".name_item").textContent;
  const images = productImages[name];
  const currentSrc = img.src.split("/").pop(); // Extract the file name
  const currentIndex = images.indexOf(currentSrc);
  const nextIndex = (currentIndex + 1) % images.length;
  img.src = imagePath + images[nextIndex];
}

function prevImage(button) {
  const itemContent = button.closest(".item_content");
  const img = itemContent.querySelector("img");
  const name = itemContent.querySelector(".name_item").textContent;
  const images = productImages[name];
  const currentSrc = img.src.split("/").pop(); // Extract the file name
  const currentIndex = images.indexOf(currentSrc);
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  img.src = imagePath + images[prevIndex];
}

function magnifyImage(button) {
  const itemContent = button.closest(".item_content");
  const img = itemContent.querySelector("img");
  const src = img.src;
  const magnifiedImg = document.createElement("img");
  magnifiedImg.src = src;
  magnifiedImg.className = "magnified_image";
  document.body.appendChild(magnifiedImg);
  magnifiedImg.onclick = () => magnifiedImg.remove();
}

async function addToCart(button) {
  const itemContent = button.closest(".item_content");
  const item = itemContent.closest(".item");
  const productId = parseInt(item.dataset.productId);
  const productName = item.dataset.productName;
  const hasSize = item.dataset.hasSize === "true";
  let size = hasSize ? itemContent.querySelector("#size").value : "none";
  const quantity = parseInt(itemContent.querySelector("#quantity").value);
  const price = parseFloat(
    itemContent.querySelector(".price_item").textContent,
  );

  const stockCheck = await checkStock({
    product_id: productId,
    variant: size,
    quantity: quantity,
  });
  console.log(stockCheck.available);

  if (!stockCheck.available) {
    const errorMsg = document.createElement("p");
    errorMsg.className = "stock-error";
    errorMsg.style.color = "red";
    errorMsg.style.fontWeight = "bold";
    errorMsg.textContent =
      `Sorry, ${productName} is out of stock or insufficient quantity available`;
    const existingError = itemContent.querySelector(".stock-error");
    if (existingError) existingError.remove();

    itemContent.appendChild(errorMsg);

    setTimeout(() => {
      errorMsg.remove();
    }, 5000);
  }

  const cart = document.querySelector(".cart ul");
  // Ensure the cart is empty by default
  if (!cart) {
    const cartDiv = document.querySelector(".cart");
    const ul = document.createElement("ul");
    cartDiv.insertBefore(ul, cartDiv.querySelector("button"));
  }

  const cartItem = document.createElement("li");
  cartItem.dataset.productId = productId;
  cartItem.dataset.size = size || "none";
  cartItem.dataset.quantity = quantity;

  const itemName = document.createElement("span");
  itemName.className = "item_name";
  if (hasSize) {
    itemName.textContent = `${quantity} x ${productName} (Size: ${size})`;
  } else {
    itemName.textContent = `${quantity} x ${productName}`;
  }
  const itemPrice = document.createElement("span");
  itemPrice.className = "item_price";
  itemPrice.textContent = `€${(price * quantity).toFixed(2)}`;

  cartItem.appendChild(itemName);
  cartItem.appendChild(itemPrice);

  const removeIcon = document.createElement("span");
  removeIcon.className = "remove-item";
  removeIcon.textContent = "x";
  removeIcon.onclick = () => removeFromCart(removeIcon, price * quantity);
  cartItem.appendChild(removeIcon);

  document.querySelector(".cart ul").appendChild(cartItem);

  updateSubtotal(price * quantity);

  const totalItems = Array.from(
    document.querySelector(".cart ul").querySelectorAll("li"),
  ).reduce(
    (sum, li) => {
      const qty = parseInt(li.dataset.quantity);
      return sum + qty;
    },
    0,
  );

  if (totalItems > 20) {
    document.querySelector(".cart .stop_message").style.display = "block";
  } else {
    document.querySelector(".cart .stop_message").style.display = "none";
  }
}
function showCustomerInfo() {
  const cartItems = document.querySelectorAll(".cart ul li");
  if (cartItems.length === 0) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "validation-error";
    errorDiv.style.color = "red";
    errorDiv.style.fontWeight = "bold";
    errorDiv.style.marginBottom = "10px";
    errorDiv.textContent = "Your cart is empty! Add some items first";

    const cartDiv = document.querySelector(".cart");

    const existingError = cartDiv.querySelector(".validation-error");
    if (existingError) existingError.remove();

    cartDiv.insertBefore(errorDiv, cartDiv.querySelector("h3"));

    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
    return;
  }
  document.querySelector(".cart").style.display = "none";
  document.querySelector(".customer_info").style.display = "block";
  document.querySelector(".overview").style.display = "none";
  document.querySelector("#step1").classList.remove("active");
  document.querySelector("#step2").classList.add("active");
  document.querySelector("#step3").classList.remove("active");
}

function removeFromCart(button, amount) {
  const cartItem = button.closest("li");
  cartItem.remove();
  updateSubtotal(-amount);

  const totalItems = Array.from(
    document.querySelector(".cart ul").querySelectorAll("li"),
  ).reduce((sum, li) => {
    const qty = parseInt(
      li.querySelector(".item_name").textContent.split(" x ")[0],
    );
    return sum + qty;
  }, 0);

  if (totalItems > 20) {
    document.querySelector(".cart .stop_message").style.display = "block";
  } else {
    document.querySelector(".cart .stop_message").style.display = "none";
  }
}

function updateSubtotal(amount) {
  let subtotal = parseFloat(
    document.querySelector(".cart .subtotal").textContent.replace(
      "Subtotal: €",
      "",
    ),
  ) || 0;
  subtotal += amount;
  document.querySelector(".cart .subtotal").textContent = `Subtotal: €${
    subtotal.toFixed(2)
  }`;

  document.getElementById("cart-sum").textContent = `Sum: €${
    subtotal.toFixed(2)
  }`;
}

async function showOverview() {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;

  const existingErrors = document.querySelectorAll(".validation-error");
  existingErrors.forEach((error) => error.remove());
  if (name === "") {
    showValidationError("name", "name is required");
    return;
  }

  if (email === "") {
    showValidationError("email", "Email is required");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showValidationError("email", "Please enter a valid email address");
  }
  const cartItems = document.querySelectorAll(".cart ul li");
  if (cartItems.length === 0) {
    showValidationError("cart", "Your cart is empty");
    return;
  }

  const items = Array.from(document.querySelectorAll(".cart ul li")).map(
    (li) => {
      return {
        product_id: parseInt(li.dataset.productId),
        variant: li.dataset.size,
        quantity: parseInt(li.dataset.quantity),
      };
    },
  );

  const stockPromises = items.map((item) => checkStock(item));
  const stockResults = await Promise.all(stockPromises);

  const stockMessage = stockResults.every((result) => result.available)
    ? "Available for pickup"
    : "Items out of Stock";

  const orderDetails = `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Subtotal: ${
    document.querySelector(".cart .subtotal").textContent
  }</p>
        <p>${stockMessage}</p>
    `;

  document.querySelector(".order_details").innerHTML = orderDetails;

  document.querySelector(".customer_info").style.display = "none";
  document.querySelector(".overview").style.display = "block";
  document.querySelector("#step2").classList.remove("active");
  document.querySelector("#step3").classList.add("active");
}

async function checkStock(item) {
  try {
    const response = await fetch("http://one.studsec.nl/api/checkstock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return { available: false };
  }
}

function showCart() {
  document.querySelector(".customer_info").style.display = "none";
  document.querySelector(".cart").style.display = "block";
  document.querySelector("#step2").classList.remove("active");
  document.querySelector("#step1").classList.add("active");
}

async function submitOrder() {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;

  const items = Array.from(document.querySelectorAll(".cart ul li")).map(
    (li) => {
      return {
        product_id: parseInt(li.dataset.productId),
        variant: li.dataset.size,
        quantity: parseInt(li.dataset.quantity),
      };
    },
  );

  const orderData = {
    customer_email: email,
    customer_name: name,
    customer_number: phone,
    send_email: false,
    items: items,
  };

  try {
    const response = await fetch("http://one.studsec.null/api/createorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    window.location.href = data.payment_link;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function getProductIdByName(name) {
  const productIds = {
    "StudSec T-shirt": 1,
    "StudSec Hoodie": 2,
    "Stickers": 3,
  };
  return productIds[name] || null;
}

function toggleCart() {
  var cartModal = document.getElementById("cartModal");
  if (cartModal.style.display === "block") {
    cartModal.style.display = "none";
  } else {
    cartModal.style.display = "block";
  }
}

function showValidationError(fieldId, message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "validation-error";
  errorDiv.style.color = "red";
  errorDiv.style.fontWeight = "bold";
  errorDiv.style.marginTop = "5px";
  errorDiv.textContent = message;

  if (fieldId === "cart") {
    const cartDiv = document.querySelector(".cart");
    cartDiv.insertBefore(errorDiv.cartDiv.querySelector("h3"));
    document.getElementById("cartModal").scrollTop = 0;
  } else {
    const field = document.querySelector(`#${fieldId}`);
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
    field.focus();
  }

  setTimeout(() => {
    errorDiv.remove();
  }, 5000);

  if (fieldId !== "cart") {
    const field = document.querySelector(`#${fieldId}`);
    field.addEventListener("input", () => {
      errorDiv.remove();
    }, { once: true });
  }
}
