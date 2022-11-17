function search_products() {
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
    if (ul.childElementCount == 0) {
        var li = document.createElement('li')
        li.setAttribute('id', 'empty')
        li.appendChild(document.createTextNode('Cart is empty!'))
        ul.appendChild(li)
    }
}

function generateID() {
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
    var empty = document.getElementById('empty')
    if (empty != null) {
        empty.parentNode.removeChild(empty)
    }

    var li = document.createElement('li')
    li.setAttribute('class', 'cart-list-item')

    // Generate and assign unique id# for each list item //
    var itemID = generateID()
    li.setAttribute('id', 'item#' + itemID)
    li.innerHTML = id + '<span class="remove-item" onClick="removeItem(this.parentNode.id)">x</span>'
    ul.appendChild(li)
}

function removeItem(id) {
    var item = document.getElementById(id)
    item.parentNode.removeChild(item)
    isCartEmpty()
}

function clearCart() {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
    isCartEmpty()
}