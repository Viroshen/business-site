function showProductDetail(id) {
    document.body.style.overflow = 'hidden'

    var productCard = document.getElementById(id).cloneNode(true)
    productCard.classList.add('selected')
    var overlay = document.querySelector('.overlay')

    overlay.appendChild(productCard)
    overlay.style.display = 'flex'

    overlay.addEventListener('click', function hideProductDetails() {
        productCard.parentNode.removeChild(productCard)
        overlay.style.display = 'none'

        document.body.style.overflow = 'scroll'
    })
}

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

function showCategory(obj) {
    // This function filters the displayed products by sub-category.
    var x = document.getElementsByClassName('category')

    for (i = 0; i < x.length; i++) {
        if (x[i].classList.contains('active-category') && !x[i].getAttribute('sub').includes(obj.getAttribute('sub'))) {
            x[i].classList.remove('active-category')
        }
    }

    var y = document.getElementsByClassName(obj.getAttribute('category'))
    for (i = 0; i < y.length; i++) {
        if (x[i].getAttribute('sub').includes(obj.getAttribute('sub'))) {
            x[i].classList.add('active-category')

            if (x[i].childElementCount == 0) {
                alert("Oh no, seems we've run out of these!")
            }
        }
    }
}

function isCartEmpty() {
    var ul = document.getElementById("cart-items")
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
    var ul = document.getElementById("cart-items")

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

    document.body.style.overflowY = 'hidden'
}

function confirmQuantity() {
    var ul = document.getElementById("cart-items")
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
        
        if (Number(qtyInput) == 0) {
            // removeItem(ul.lastChild.id)
            ul.lastChild.parentElement.removeChild(ul.lastChild)
            isCartEmpty()

            var counter = document.getElementsByClassName('counter')[0]
            counter.innerHTML = parseInt(counter.innerHTML) - 1

        } else {
            var totalAmt = document.getElementsByClassName('total-amount')[0]
            var amount = 0.00
            amount = parseFloat(ul.lastChild.childNodes[2].innerHTML) * parseFloat(qtyInput)
            amount += parseFloat(totalAmt.innerHTML)
            console.log(amount.toFixed(2))
            totalAmt.innerHTML = amount.toFixed(2)
        }
    }
    document.body.style.overflowY = 'scroll'
}

function removeItem(id) {
    var ul = document.getElementById("cart-items")
// Removes parent li tag from cart ul, using the given child's id to specify.
    var item = document.getElementById(id)

    var total = document.getElementsByClassName('total-amount')[0]
    var newTotal = parseFloat(total.innerHTML) - parseFloat(item.childNodes[2].innerHTML)
    total.innerHTML = newTotal.toFixed(2)

    item.parentNode.removeChild(item)
    isCartEmpty()

    var counter = document.getElementsByClassName('counter')[0]
    counter.innerHTML = parseInt(counter.innerHTML) - 1
}

function clearCart() {
    var ul = document.getElementById("cart-items")
// Loops through ul(cart) removing each list item, then displays "Cart is empty!".
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
    isCartEmpty()

    var total = document.getElementsByClassName('total-amount')[0]
    total.innerHTML = "0.00"

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