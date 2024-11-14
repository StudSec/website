// Change style of navbar on scroll
window.onscroll = function() {myFunction()};
function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-black";
    } else {
        navbar.className = navbar.className.replace("w3-card w3-animate-top w3-black", "");
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
    "StudSec T-shirt": ["StudSecShirtBlue_Front.jpg", "StudSecShirtBlue_Back.jpg"],
    "StudSec Hoodie": ["StudSecHoodieBlue_Front.jpg", "StudSecHoodieBlue_Back.jpg"],
    "Stickers": ["Stickers1.png", "Stickers2.png"]
};

const imagePath = "images/products/";

function nextImage(button) {
    const itemContent = button.closest('.item_content');
    const img = itemContent.querySelector('img');
    const name = itemContent.querySelector('.name_item').textContent;
    const images = productImages[name];
    const currentSrc = img.src.split('/').pop(); // Extract the file name
    const currentIndex = images.indexOf(currentSrc);
    const nextIndex = (currentIndex + 1) % images.length;
    img.src = imagePath + images[nextIndex];
}

function prevImage(button) {
    const itemContent = button.closest('.item_content');
    const img = itemContent.querySelector('img');
    const name = itemContent.querySelector('.name_item').textContent;
    const images = productImages[name];
    const currentSrc = img.src.split('/').pop(); // Extract the file name
    const currentIndex = images.indexOf(currentSrc);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    img.src = imagePath + images[prevIndex];
}

function magnifyImage(button) {
    const itemContent = button.closest('.item_content');
    const img = itemContent.querySelector('img');
    const src = img.src;
    const magnifiedImg = document.createElement('img');
    magnifiedImg.src = src;
    magnifiedImg.className = 'magnified_image';
    document.body.appendChild(magnifiedImg);
    magnifiedImg.onclick = () => magnifiedImg.remove();
}

function addToCart(button) {
    const itemContent = button.closest('.item_content');
    const name = itemContent.querySelector('.name_item').textContent;
    const size = itemContent.querySelector('#size').value;
    const quantity = parseInt(itemContent.querySelector('#quantity').value);
    const price = parseFloat(itemContent.querySelector('.price_item').textContent);

    const cart = document.querySelector('.cart ul');
    if (!cart) {
        const cartDiv = document.querySelector('.cart');
        const ul = document.createElement('ul');
        cartDiv.insertBefore(ul, cartDiv.querySelector('button'));
    }

    const cartItem = document.createElement('li');
    const itemName = document.createElement('span');
    itemName.className = 'item_name';
    itemName.textContent = `${quantity} x ${name} (Size: ${size})`;
    const itemPrice = document.createElement('span');
    itemPrice.className = 'item_price';
    itemPrice.textContent = `€${(price * quantity).toFixed(2)}`;
    cartItem.appendChild(itemName);
    cartItem.appendChild(itemPrice);
    cart.appendChild(cartItem);

    updateSubtotal(price * quantity);

    const totalItems = Array.from(cart.querySelectorAll('li')).reduce((sum, li) => {
        const qty = parseInt(li.querySelector('.item_name').textContent.split(' x ')[0]);
        return sum + qty;
    }, 0);

    if (totalItems > 20) {
        document.querySelector('.cart .stop_message').style.display = 'block';
    } else {
        document.querySelector('.cart .stop_message').style.display = 'none';
    }

    if (totalItems > 0) {
        document.querySelector('.cart .ideal_fee').style.display = 'block';
    } else {
        document.querySelector('.cart .ideal_fee').style.display = 'none';
    }
}

function updateSubtotal(amount) {
    let subtotal = parseFloat(document.querySelector('.cart .subtotal').textContent.replace('Subtotal: €', '')) || 0;
    subtotal += amount;
    document.querySelector('.cart .subtotal').textContent = `Subtotal: €${subtotal.toFixed(2)}`;

    const mollieFee = subtotal * 0.018 + 0.25;
    document.querySelector('.cart .mollie_fee').textContent = `Mollie Fee: €${mollieFee.toFixed(2)}`;
}

function showCustomerInfo() {
    document.querySelector('.cart').style.display = 'none';
    document.querySelector('.customer_info').style.display = 'block';
    document.querySelector('.overview').style.display = 'none';
    document.querySelector('#step1').classList.remove('active');
    document.querySelector('#step2').classList.add('active');
    document.querySelector('#step3').classList.remove('active');
}

function showOverview() {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;

    const orderDetails = `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Subtotal: ${document.querySelector('.cart .subtotal').textContent}</p>
        <p>${document.querySelector('.cart .mollie_fee').textContent}</p>
        <p>${document.querySelector('.cart .cc_fee').textContent}</p>
    `;

    document.querySelector('.order_details').innerHTML = orderDetails;

    document.querySelector('.customer_info').style.display = 'none';
    document.querySelector('.overview').style.display = 'block';
    document.querySelector('#step2').classList.remove('active');
    document.querySelector('#step3').classList.add('active');
}

function showCart() {
    document.querySelector('.customer_info').style.display = 'none';
    document.querySelector('.cart').style.display = 'block';
    document.querySelector('#step2').classList.remove('active');
    document.querySelector('#step1').classList.add('active');
}

function submitOrder() {
    alert('Order submitted!');
    // Add order submission logic here
}
