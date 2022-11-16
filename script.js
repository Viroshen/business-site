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
if (ul.childElementCount == 0) {
    var li = document.createElement('li')
    li.setAttribute('id', 'empty')
    li.appendChild(document.createTextNode('Cart is empty!'))
    ul.appendChild(li)
}

function addToCart(id) {
    var empty = document.getElementById('empty')
    if (empty != null) {
        empty.parentNode.removeChild(empty)
    }

    // var newItem = document.getElementById(id);
    var li = document.createElement('li')
    li.appendChild(document.createTextNode(id))
    ul.appendChild(li)
}