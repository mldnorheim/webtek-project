
//Lage menyen:
let meny = document.createElement("div")
meny.setAttribute("class", "meny")

let logo = document.createElement("input")
logo.setAttribute("id", "logo")
logo.type = "image"
logo.src = "images/logo.png"

let orderButton = document.createElement("button")
orderButton.setAttribute("id", "order_button")
orderButton.innerHTML = "Bestill pizza"

let contactButton = document.createElement("button")
contactButton.setAttribute("id", "contact_button")
contactButton.innerHTML = "Kontakt"

let aboutButton = document.createElement("button")
aboutButton.setAttribute("id", "about_button")
aboutButton.innerHTML = "Om oss"

let shopcart = document.createElement("input")
shopcart.setAttribute("id", "shopcart")
shopcart.type = "image"
shopcart.src = "images/handlekurv.svg"

meny.appendChild(logo)
meny.appendChild(orderButton)
meny.appendChild(contactButton)
meny.appendChild(aboutButton)
meny.appendChild(shopcart)
body.insertBefore(meny, body.childNodes[0])


//Legg til event listener på hver av elementene i menyen
logo.addEventListener("click", function() {
  window.location.href = "mainpage.html"
})
order_button.addEventListener("click", function() {
  window.location.href = "order.html"
})
contactButton.addEventListener("click", function() {
  window.location.href = "contact.html"
})
aboutButton.addEventListener("click", function() {
  window.location.href = "about.html"
})
shopcart.addEventListener("click", function() {
  window.location.href = "shoppingcart.html"
})
