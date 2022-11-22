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

function getCategory(category) {
    // This function filters the displayed products by category.
    var x = document.getElementsByClassName('category')

    // loop through "category" containers and display only the one with the specific id.
    for (i = 0; i < x.length; i++) {
        if (!x[i].id.includes(category)) {
            x[i].style.display = 'none'
        } else {
            x[i].style.display = 'grid'
            // if "category" container is empty then an alert will show.
            if (x[i].childElementCount == 0) {
                alert('Sorry, we seem to have run out of ' + x[i].id + '!')
            }
        }
    }

    var categoryBtn = document.getElementsByClassName('category-btn')

    for (i = 0; i < categoryBtn.length; i++) {
        if (categoryBtn[i].classList.contains('active-category') && !categoryBtn[i].id.includes(category)) {
            categoryBtn[i].classList.remove('active-category')
        }
    }
    var activeCategorybtn = document.getElementById(category)
    activeCategorybtn.classList.add('active-category')
}

var ul = document.getElementById("cart-items")

function isCartEmpty() {
// isCartEmpty() checks if the cart is currently empty, and if so, it will display "Cart is empty!".
    if (ul.childElementCount == 0) {
        var li = document.createElement('li')
        li.setAttribute('id', 'empty')
        li.appendChild(document.createTextNode('Cart is empty!'))
        ul.appendChild(li)

        var checkoutLink = document.getElementById('checkout')
        checkoutLink.setAttribute('pointer-events', 'none')
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

    var quantity = document.createElement('span')
    quantity.innerHTML = "Qty."
    quantity.setAttribute('class', 'qty')
    li.appendChild(quantity)

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

    var checkoutLink = document.getElementById('checkout')
    checkoutLink.style.pointerEvents = 'all'

    var quantityContainer = document.getElementsByClassName('quantity')[0]
    quantityContainer.style.scale = 1

    var qtyInput = document.getElementById('qty')
    qtyInput.value = ''
    

    var overlay = document.getElementsByClassName('overlay')[0]
    overlay.style.display = 'block'
}

function confirmQuantity() {
    var qtyInput = document.getElementById('qty').value
    // console.log(typeof(Number(qtyInput)))
    if (!(Number(qtyInput) >= 0) || qtyInput == '') {
        alert('Invalid quantity specified!')
    } else {
        var listItemQuantity = ul.lastChild.getElementsByClassName('qty')[0]
        listItemQuantity.innerHTML = qtyInput

        var quantityContainer = document.getElementsByClassName('quantity')[0]
        quantityContainer.style.scale = 0
        
        var overlay = document.getElementsByClassName('overlay')[0]
        overlay.style.display = 'none'
    }
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

function sendEmail() {
    Email.send({
        SecureToken: "16738e5e-b4d1-40d4-8cec-68b00e6b21b1",
        To: "viroshens15@gmail.com",
        From: "mikehunt.6654@gmail.com",
        Subject: "Email from website through javascript",
        Body: "Did it work??"
    })

    .then(function (message) {
        alert("mail sent successfully")
    })
}