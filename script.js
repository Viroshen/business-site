const parallax = document.getElementById('parallax-img');
window.addEventListener('scroll', function() {
    let offset = window.pageYOffset;
    parallax.style.backgroundPosition = offset * 0.8 + 'px';
})

function search_products() {
// Uses searchbar values as input then displays only the product-cards with the searched values.
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('product-card')

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = 'none';
        }
        else {
            x[i].style.display = 'block';
        }
    }
}

var ul = document.getElementById("cart-items")

function isCartEmpty() {
// isCartEmpty() checks if the cart is currently empty, and if so, it will display "Cart is empty!".
    if (ul.childElementCount == 0) {
        var li = document.createElement('li')
        li.setAttribute('id', 'empty')
        li.appendChild(document.createTextNode('Cart is empty!'))
        ul.appendChild(li)
    }
}

function generateID() {
// Function to generate a unique 5 character id for each list item.
    var newID = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    var itemIDs = document.getElementsByClassName('cart-list-item')

    for (j = 0; j < 5; j++) {
        newID += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    for (i = 0; i < itemIDs.length; i++) {
        if (newID == itemIDs[i].id) {
            generateID()
        }
    }
    return (newID)
}

function addToCart(id) {
// Creates li tag for every item added to the cart.
    var empty = document.getElementById('empty')
    if (empty != null) {
        empty.parentNode.removeChild(empty)
    }

    var li = document.createElement('li')
    li.setAttribute('class', 'cart-list-item')

    var product = document.getElementById(id)
    var itemID = generateID()
    li.setAttribute('id', 'item#' + itemID)

    var description = document.createElement('span')
    description.innerHTML = product.getAttribute('description')
    description.setAttribute('class', 'item-description')
    li.appendChild(description)

    var price = document.createElement('span')
    price.innerHTML = product.getAttribute('price')
    price.setAttribute('class', 'price')
    li.appendChild(price)

    var removeItem = document.createElement('span')
    removeItem.innerHTML = '-'
    removeItem.setAttribute('class', 'remove-item')
    removeItem.setAttribute('onclick', "removeItem(this.parentNode.id)")
    li.appendChild(removeItem)
    
    ul.appendChild(li)
    li.scrollIntoView()

    var counter = document.getElementsByClassName('counter')[0]
    counter.innerHTML = parseInt(counter.innerHTML) + 1
}

function removeItem(id) {
// Removes parent li tag from cart ul, using the given child's id to specify.
    var item = document.getElementById(id)
    item.parentNode.removeChild(item)
    isCartEmpty()

    var counter = document.getElementsByClassName('counter')[0]
    counter.innerHTML = parseInt(counter.innerHTML) - 1
}

function clearCart() {
// Loops through ul(cart) removing each list item, then displays "Cart is empty!".
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
    isCartEmpty()

    var counter = document.getElementsByClassName('counter')[0]
    counter.innerHTML = 0

    hideCart()
}

function hideCart() {
// Hide / Close cart by toggling checkbox.
    var toggleBtn = document.getElementById('toggle-cart')
    toggleBtn.checked = !toggleBtn.checked
}