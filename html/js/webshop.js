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
    "Stickers": ["sticker.png"]
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
    // Ensure the cart is empty by default
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
    const removeIcon = document.createElement('span');
    removeIcon.className = 'remove-item';
    removeIcon.textContent = 'x';
    removeIcon.onclick = () => removeFromCart(removeIcon, price * quantity);
    cartItem.appendChild(removeIcon);
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

}
function showCustomerInfo() {
    document.querySelector('.cart').style.display = 'none';
    document.querySelector('.customer_info').style.display = 'block';
    document.querySelector('.overview').style.display = 'none';
    document.querySelector('#step1').classList.remove('active');
    document.querySelector('#step2').classList.add('active');
    document.querySelector('#step3').classList.remove('active');
}

function removeFromCart(button, amount) {
    const cartItem = button.closest('li');
    cartItem.remove();
    updateSubtotal(-amount);

    const totalItems = Array.from(document.querySelector('.cart ul').querySelectorAll('li')).reduce((sum, li) => {
        const qty = parseInt(li.querySelector('.item_name').textContent.split(' x ')[0]);
        return sum + qty;
    }, 0);

    if (totalItems > 20) {
        document.querySelector('.cart .stop_message').style.display = 'block';
    } else {
        document.querySelector('.cart .stop_message').style.display = 'none';
    }
}

function updateSubtotal(amount) {
    let subtotal = parseFloat(document.querySelector('.cart .subtotal').textContent.replace('Subtotal: €', '')) || 0;
    subtotal += amount;
    document.querySelector('.cart .subtotal').textContent = `Subtotal: €${subtotal.toFixed(2)}`;

    document.getElementById('cart-sum').textContent = `Sum: €${subtotal.toFixed(2)}`;
}

async function showOverview() {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;

    const items = Array.from(document.querySelectorAll('.cart ul li')).map(li => {
        const [quantity, name] = li.querySelector('.item_name').textContent.split(' x ');
        const size = name.match(/\(Size: (.+)\)/)[1];
        const productId = getProductIdByName(name.replace(` (Size: ${size})`, ''));
        return {
            product_id: productId,
            variant: size,
            quantity: parseInt(quantity)
        };
    });

    const stockPromises = items.map(item => checkStock(item));
    const stockResults = await Promise.all(stockPromises);

    const stockMessage = stockResults.every(result => result.available) 
        ? 'Available for pickup' 
        : 'Delivery time: 10 days';

    const orderDetails = `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Subtotal: ${document.querySelector('.cart .subtotal').textContent}</p>
        <p>${stockMessage}</p>
    `;

    document.querySelector('.order_details').innerHTML = orderDetails;

    document.querySelector('.customer_info').style.display = 'none';
    document.querySelector('.overview').style.display = 'block';
    document.querySelector('#step2').classList.remove('active');
    document.querySelector('#step3').classList.add('active');
}

async function checkStock(item) {
    try {
        const response = await fetch('https://zero.studsec.nl/api/checkstock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { available: false };
    }
}

function showCart() {
    document.querySelector('.customer_info').style.display = 'none';
    document.querySelector('.cart').style.display = 'block';
    document.querySelector('#step2').classList.remove('active');
    document.querySelector('#step1').classList.add('active');
}

async function submitOrder() {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;

    const items = Array.from(document.querySelectorAll('.cart ul li')).map(li => {
        const [quantity, name] = li.querySelector('.item_name').textContent.split(' x ');
        const size = name.match(/\(Size: (.+)\)/)[1];
        const productId = getProductIdByName(name.replace(` (Size: ${size})`, ''));
        return {
            product_id: productId,
            variant: size,
            quantity: parseInt(quantity)
        };
    });

    const orderData = {
        customer_email: email,
        customer_name: name,
        customer_number: phone,
        send_email: false,
        items: items
    };

    try {
        const response = await fetch('https://zero.studsec.nl/api/createorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        window.location.href = data.payment_link;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function getProductIdByName(name) {
    const productIds = {
        "StudSec T-shirt": 1,
        "StudSec Hoodie": 2,
        "Stickers": 3
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
