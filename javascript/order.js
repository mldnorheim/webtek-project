let dinOrder = [] //Dette er hva som blir sendt til shoppingcart når man trykker på legg til i handlekurv

if (JSON.parse(localStorage.getItem("pizzaer") != null)) {
  dinOrder = JSON.parse(localStorage.getItem("pizzaer"))
}

const pizzaTyperObjekt = {
  margherita: {
    navn: "Margherita",
    pris: 120,
    toppinger: ["tomatsaus", "mozzarella"],
    veggis: false
  },
  pepperoni: {
    navn: "Pepperoni",
    pris: 140,
    toppinger: ["tomatsaus", "pepperoni", "paprika"],
    veggis: false
  },
  tacopizza: {
    navn: "Tacopizza",
    pris: 150,
    toppinger: ["tomatsaus", "kjøttdeig", "mais", "nachochips"],
    veggis: false
  },
  hawaii: {
    navn: "Hawaii",
    pris: 130,
    toppinger: ["tomatsaus", "skinke", "ananas"],
    veggis: false
  },
  skinkesopp: {
    navn: "Skinke & sopp",
    pris: 130,
    toppinger: ["tomatsaus", "skinke", "sjampinjong"],
    veggis: false
  },
  olivenpizza: {
    navn: "Olivenpizza",
    pris: 130,
    toppinger: ["tomatsaus", "oliven"],
    veggis: false
  },
  sjopizza: {
    navn: "Sjøpizza",
    pris: 140,
    toppinger: ["tomatsaus", "reker", "oliven", "ruccola"],
    veggis: false
  },
  hvitpotetpizza: {
    navn: "Hvit potetpizza",
    pris: 140,
    toppinger: ["hvit saus", "potet", "squash", "paprika"],
    veggis: true
  },
  fireoster: {
    navn: "Fire oster",
    pris: 140,
    toppinger: ["tomatsaus", "hvitost", "jarlsberg", "blåmuggost", "parmesan"],
    veggis: true
  },
  spicy: {
    navn: "Spicy",
    pris: 130,
    toppinger: ["spicy tomatsaus", "pepperoni", "chili", "ruccola"],
    veggis: false
  },
  veggi: {
    navn: "Veggi",
    pris: 150,
    toppinger: ["tomatsaus", "sjampinjong", "rødløk", "vegansk ost"],
    veggis: true
  },
  spesial: {
    navn: "Dumbledough spesial",
    pris: 150,
    toppinger: ["magisk pizzabunn", "magisk pizzasaus", "magiske toppinger"],
    veggis: false
  }
} //Alle pizzaene vi har med navn, pris, toppinger og om den er vegetar


const pizzaBunnObjekt = {
  standard: {
    navn: "Standard pizzabunn",
    pris: 75
  },
  tynn: {
    navn: "Ekstra Tynn bunn",
    pris: 80
  },
  fullkorn: {
    navn: "Fullkornsbunn",
    pris: 85
  },
  glutenfri: {
    navn: "Glutenfri bunn",
    pris: 90
  }
} //Dette er hvilke bunner vi har, navn og pris


const pizzaSausObjekt = {
  standard: {
    navn: "Standard tomatsaus",
    pris: 10
  },
  spicy: {
    navn: "Spicy tomatsaus",
    pris: 20
  },
  hvit: {
    navn: "Hvit saus (crème fraîche)",
    pris: 20
  }
} //Hvilke sauser vi har, navn og pris


const pizzaToppingObjekt = {
  ingentopping: {
    navn: "Ingen topping",
    pris: 0,
    grønske: 0
  },
  ost: {
    navn: "---Ost---",
    pris: 0,
    grønske: 0
  },
  veganskost: {
    navn: "Vegansk ost",
    pris: 10,
    grønske: 0
  },
  mozarella: {
    navn: "Mozarella" ,
    pris: 10,
    grønske: 0
  },
  kjott: {
    navn: "---Kjøtt---",
    pris: 0,
    grønske: 0
  },
  skinke: {
    navn: "Skinke",
    pris: 10,
    grønske: 0
  },
  bacon: {
    navn: "Bacon",
    pris: 10,
    grønske: 0
  },
  pepperoni: {
    navn: "Pepperoni",
    pris: 10,
    grønske: 0
  },
  gronnsaker: {
    navn: "---Grønnsaker---",
    pris: 0,
    grønske: 0
  },
  sjampinjong: {
    navn:"Sjampinjong",
    pris: 10,
    grønske: 1 //Teknisk sett ikke en grønnsak, men men...
  },
  ruccola: {
    navn:"Ruccolasalat",
    pris: 10,
    grønske: 1
  },
  spinat: {
    navn: "Spinat",
    pris: 10,
    grønske: 1
  },
  mais: {
    navn: "Mais",
    pris: 10,
    grønske: 1
  },
  gulløk: {
    navn: "Gul løk",
    pris: 10,
    grønske: 1
  },
  rødløk: {
    navn: "Rød løk",
    pris: 10,
    grønske: 1
  },
  oliven: {
    navn: "Oliven",
    pris: 10,
    grønske: 1
  },
  squash: {
    navn: "Squash",
    pris: 10,
    grønske: 1
  },
  brokkoli: {
    navn: "Brokkoli",
    pris: 10,
    grønske: 1
  },
  potet: {
    navn: "Potet",
    pris: 10,
    grønske: 1
  },
  paprika: {
    navn: "Ananas",
    pris: 10,
    grønske: 1
  }
} //Alle toppinger, inkl. deleren til selecten


let minverdi = 0
let maxverdi = 9


let orderFormMenu = document.getElementById("select_pizza")
let bunner = document.getElementById("select_bottom")
bunner.setAttribute("class", "makeOwnPizza")

let sauser = document.getElementById("select_sauce")
sauser.setAttribute("class", "makeOwnPizza")

let toppinger1 = document.getElementById("select_topping1")
toppinger1.setAttribute("class", "makeOwnPizza")

let toppinger2 = document.getElementById("select_topping2")
toppinger2.setAttribute("class", "makeOwnPizza")

let toppinger3 = document.getElementById("select_topping3")
toppinger3.setAttribute("class", "makeOwnPizza") //Legger til samme klasse på alle selectene, sånn at man kan hente ut info fra dem senere

let pris1 = document.getElementById("pris1")
let pris2 = document.getElementById("pris2") //pris1 og pris2 er de som skal oppdateres etterhvert som man velger pizzaer og lager sin egen
let grønnsaksrabatt = document.getElementById("makeOwnPris") //Hvor det skal komme opp at man har fått grønnsaksrabatt hvis man har valgt 3 grønnsaker

let vegetarBilde = document.createElement("img") //Lager vegetarbildet som skal vises på de pizzaene som er vegetar
vegetarBilde.alt = "veggie img"
vegetarBilde.src = "images/veggie.svg"
vegetarBilde.setAttribute("class", "vegetarBilde")

let addToCartButton1 = document.getElementById("add_to_cart1") //Legg til i handlekurv-knappene
let addToCartButton2 = document.getElementById("add_to_cart2")
let addToCartButton3 = document.getElementById("add_to_cart_random")


let pizzaKeys = Object.keys(pizzaTyperObjekt) //Nøklene til de forskjellige objektene
let bunnKeys = Object.keys(pizzaBunnObjekt)
let sausKeys = Object.keys(pizzaSausObjekt)
let toppingKeys = Object.keys(pizzaToppingObjekt)

let antallBunner = bunnKeys.length //Antall keys
let antallSauser = sausKeys.length
let antallToppinger = toppingKeys.length


let visLagtTilRandom = document.getElementById("lagtTilRandomPizza") //Skal vises når man har lagt til i handlekurven
let visLagtTilEgen = document.getElementById("lagtTilEgenPizza")


let i = 1 //Brukes til å lage tallene foran navnet på pizzaen i øverste form
for (pizza in pizzaTyperObjekt) {
  let nypizza = document.createElement("input")
  nypizza.name = pizzaTyperObjekt[pizza].navn.replace(/\s/g, "")
  nypizza.type = "number"
  nypizza.max = maxverdi
  nypizza.min = minverdi
  nypizza.id = pizzaKeys[i-1]
  nypizza.setAttribute("class", "pizzaInput")
  let tekst = document.createTextNode(i + ". " + pizzaTyperObjekt[pizza].navn + " (" + pizzaTyperObjekt[pizza].pris + ",-) ")
  orderFormMenu.appendChild(tekst)
  if (pizzaTyperObjekt[pizza].veggis) {
    orderFormMenu.appendChild(vegetarBilde.cloneNode(true))
    let space = " "
    orderFormMenu.appendChild(document.createTextNode(space))
  }
  orderFormMenu.appendChild(nypizza)
  //Dette er for å vise hva som er på pizzaen
  let toppings = pizzaTyperObjekt[pizza].toppinger
  let toppingsString = makeString(toppings)
  p = document.createElement("p")
  p.setAttribute("class","toppingListeHverPizza")
  p.innerHTML = toppingsString
  orderFormMenu.appendChild(p)
  i += 1
} //Lager pizzaformen dynamisk


i = 0
for (bunn in pizzaBunnObjekt) {
  let nybunn = document.createElement("option")
  nybunn.value = pizzaBunnObjekt[bunn].navn.replace(/\s/g, "")
  nybunn.id = bunnKeys[i]
  nybunn.innerHTML = pizzaBunnObjekt[bunn].navn + " " + String(pizzaBunnObjekt[bunn].pris) + ",-"
  bunner.appendChild(nybunn)
  i += 1
} //Legger til bunnene i option i select i andre form


i = 0
for (saus in pizzaSausObjekt) {
  let nysaus = document.createElement("option")
  nysaus.value = pizzaSausObjekt[saus].navn.replace(/[()\s]/g,"")
  nysaus.id = sausKeys[i]
  nysaus.innerHTML = pizzaSausObjekt[saus].navn + " " + String(pizzaSausObjekt[saus].pris) + ",-"
  sauser.appendChild(nysaus)
  i += 1
} //Tilsvarende for saus...


i = 0
for (topping in pizzaToppingObjekt) {
  let nytopping = document.createElement("option")
  let forkort = pizzaToppingObjekt[topping]
  nytopping.value = forkort.navn.replace(/[\s-]/g, "")
  nytopping.id = topping
  nytopping.innerHTML = forkort.navn + " " + String(forkort.pris) + ",-"
  if (nytopping.value === "Ost" || nytopping.value === "Kjøtt" || nytopping.value === "Grønnsaker") {
    nytopping.innerHTML = "-" + nytopping.innerHTML.replace(/[\s,0]/g, "")
    nytopping.disabled = true
  }
  toppinger1.appendChild(nytopping.cloneNode(true))
  toppinger2.appendChild(nytopping.cloneNode(true))
  toppinger3.appendChild(nytopping.cloneNode(true))
} //Og for toppinger


let currentPizzaMakeOwn = [{}, {}, {}, {}, {}, {}] //Den pizzaen som blir laget atm
let selvValgtPizza = { //Vise hva slags pizza når man lager en selvvalgt, til handlekurven
  navn: "Selvvalgt pizza",
  pris: 85
}
currentPizzaMakeOwn[0] = selvValgtPizza
currentPizzaMakeOwn[1] = pizzaBunnObjekt.standard
currentPizzaMakeOwn[2] = pizzaSausObjekt.standard
currentPizzaMakeOwn[3] = pizzaToppingObjekt.ingentopping
currentPizzaMakeOwn[4] = pizzaToppingObjekt.ingentopping
currentPizzaMakeOwn[5] = pizzaToppingObjekt.ingentopping


let currentPris2 = 0

let makePizzaSelects = document.getElementsByClassName("makeOwnPizza") //Klassen med de forskjellige selevtene


for (let select of makePizzaSelects) {
  select.addEventListener("change", function(e) { //Legge til event listener på hver av selectene i andre formen, og oppdatere den pizzaen man lager atm
    let ting = select.options[select.selectedIndex].id //ID-en til den optionen som er selecta (og endret til)
    if (e.target.id == "select_bottom") {
      currentPizzaMakeOwn[1] = pizzaBunnObjekt[ting]
    }
    else if (e.target.id == "select_sauce") {
      currentPizzaMakeOwn[2] = pizzaSausObjekt[ting]
    }
    else if (e.target.id == "select_topping1") {
      currentPizzaMakeOwn[3] = pizzaToppingObjekt[ting]
    }
    else if (e.target.id == "select_topping2") {
      currentPizzaMakeOwn[4] = pizzaToppingObjekt[ting]
    }
    else if (e.target.id == "select_topping3") {
      currentPizzaMakeOwn[5] = pizzaToppingObjekt[ting]
    }
    let price = calculatePris2()
    let selvValgtPizza = { //Lar den nyeste pizzaen være objektet med selevvalgt pizza
      navn: "Selvvalgt pizza",
      pris: price
    }
    currentPizzaMakeOwn[0] = selvValgtPizza
  })
}


function calculatePris2() { //Går gjennom den selvvalgte pizzaen og regner ut prisen etter hva som er i objektet selvvalgt pizza
  currentPris2 = 0
  for (let j = 1; j < 6; j++) {
    currentPris2 += currentPizzaMakeOwn[j].pris
  }
  checkDiscount() //Her kalles grønnsaksrabatt-funksjonen for å gi ut riktig pris
  return currentPris2
}


calculatePris2()

let listeMedPizzaer = [] //Skal bli den lista med pizzaer som skal sendes når man trykker på legg til i handlekurv
document.addEventListener("input", oppdaterMeny)
function oppdaterMeny(e) {
  if (e.target.value < minverdi) { //Hvis man skriver mindre enn minverdi, så blir det bare min
    e.target.value = minverdi
  }
  if (e.target.value == 0) { //Sjekker hvis man skriver inn 0, så skal det ikke stå noe i input feltet
    e.target.value = ""
  }
  if (e.target.value > maxverdi) { //Hvis man skriver mer enn maxverdi, så blir det bare maks
    e.target.value = maxverdi
  }
  listeMedPizzaer = [{ //Første elementet blir en indikator når man
    navn: "Meny Pizza"
  }]
  let pris = 0
  let i = 0
  for (pizza in pizzaTyperObjekt) { //Går gjennom pizzaene i objektet for å se om den ligger i den listen personen har valgt å legge til i handlekurven, og hvor mange
    let currentPrice = pizzaTyperObjekt[pizza].pris //Henter ut prisen til den sepsifikke pizzaen
    let antallAvHver = orderFormMenu[i].value //Henter ut verdien (antallet av den pizzaen) som skal legges til
    if (antallAvHver == "") { //Hvis den er tom, så vil antall være 0
      antallAvHver = 0
    }
    pris += (currentPrice)*(antallAvHver) //Prisen som skal vises nederst nederst i boksen oppdateres
    i += 1
    let pizza1 = { //Dette er pizzaen som skal legges til i listen med pizzaer...
      navn: pizzaTyperObjekt[pizza].navn,
      pris: currentPrice,
      antall: antallAvHver
    }

    if (antallAvHver !== 0) { //Gitt at det ikke er 0 av den
      listeMedPizzaer.push(pizza1)
    }
  }
  pris1.innerHTML = pris //Oppdatere prisen nedrest i boksen med prisen for alle pizzaene man har valgt, når man har gått igjennom alle pizzaene
}


let gyldigToppingIndex = []


for (let i in toppingKeys) {
  if (toppingKeys[i] != "ost") {
    if (toppingKeys[i] != "kjott") {
      if (toppingKeys[i] != "gronnsaker") {
        gyldigToppingIndex.push(parseInt(i))
      }
    }
  }
} //Skal gi en liste med indexer som er gyldig til bruk i makeRandomPizza()


addToCartButton1.addEventListener("click", function() {
  if (listeMedPizzaer.length == 1 || listeMedPizzaer == 0) { //Skal sjekke om man kan legge til ting i handlekurven, hvis man ikke har valgt noen pizzaer, så får man beskjed
    alert("Vennligst velg noen pizzaer å legge til handleurven")
  }
  else {
    for (let j = 1; j < listeMedPizzaer.length; j++) { //Går i gjennom alle pizzaene i lista med pizzaer man har bestillt og legger de til i dinOrder, med en indikator at det er en menypizza
      let generisk = [{
        navn: "Meny Pizza"
      }]
      generisk.push(listeMedPizzaer[j])
      dinOrder.push(generisk)
    }
    for (let input of orderFormMenu) { //Oppdaterer inputfeltene i menyen og setter de til ""
      input.value = ""
    }
    pris1.innerHTML = 0 //Endrer prisen til 0 til slutt, slik at man ser at man har lagt til noe i handlekurven
    alert("Du har nå lagt til dine valgte pizzaer i handlekurven!")
  }
  localStorage.setItem("pizzaer", JSON.stringify(dinOrder)) //Setter det man har lagt til i dinOrder og lager en localStorage av de med key pizzaer
})

addToCartButton2.addEventListener("click", function() { //Skal legge til selvvalgt pizza i handlekurven
  dinOrder.push(currentPizzaMakeOwn)
  localStorage.setItem("pizzaer", JSON.stringify(dinOrder))
  if (visLagtTilEgen.innerHTML !== "") { //Bare for å vise at man har lagt til noe i handlekurven, uten å alerte
    visLagtTilEgen.innerHTML += "!"
  }
  else {
    visLagtTilEgen.innerHTML = "Du har lagt til en selvvalgt pizza!"
  }
})

addToCartButton3.addEventListener("click", makeRandomPizza)


function makeRandomPizza() {
  let randomPizza = [] //Dette skal bli den ferdige pizzaen, gitt i en array
  let random_pizza = {
    navn: "Random pizza",
    pris: 100
  }
  randomPizza.push(random_pizza)
  let bunnIndex = Math.floor(Math.random()*antallBunner) //Lager en bunn index som skal brukes til å finne hvilken bunn vi skal bruke
  let bunn = pizzaBunnObjekt[bunnKeys[bunnIndex]] //Finner denne bunnen i objektet
  let sausIndex = Math.floor(Math.random()*antallSauser) //Samme for saus
  let saus = pizzaSausObjekt[sausKeys[sausIndex]] // --"--
  randomPizza.push(bunn) //Legger til bunnobjektet i pizzaen
  randomPizza.push(saus) //Legger til sausobjektet i pizzaen
  antallRandomToppinger = Math.ceil(Math.random()*10)
  for (let j=1; j <= antallRandomToppinger; j++) { //Skal ha 3 toppinger
    let toppingIndex = gyldigToppingIndex[Math.floor(Math.random()*gyldigToppingIndex.length)] //Random topping som skal velges
    let topping = pizzaToppingObjekt[toppingKeys[toppingIndex]] //Dette velger objektet som toppingen representerer
    randomPizza.push(topping) //Legger til toppingen i pizzaen
  }
  dinOrder.push(randomPizza)
  localStorage.setItem("pizzaer", JSON.stringify(dinOrder))
  if (visLagtTilRandom.innerHTML !== "") {
    visLagtTilRandom.innerHTML += "!"
  }
  else {
    visLagtTilRandom.innerHTML = "Du har lagt til en tilfeldig pizza!"
  }
}


function makeString(list) { //Dette er for å lage en string av en liste med strenger
  let a = ""
  for (g of list) {
    a = a + g + ", "
  }
  a = "(" + a.slice(0,-2) + ")"
  return a
}


function redirectTo(url) { //Sende brukeren til url-en
  window.location = url
}


///////// Dette er gjort av ELla: funksjon som sjekker grønnsaksrabatt! /////////
function checkDiscount() {
  let grønske_tall = 0
  for (let i = 3; i < currentPizzaMakeOwn.length; i++) {
    grønske_tall += currentPizzaMakeOwn[i].grønske //Summerer grønske-tallet til toppingene (dvs. hvor mange som er grønnsak)
  }
  if (grønske_tall == 3) {
    currentPizzaMakeOwn[0].pris -= 25 //Reduserer prisen hvis antall grønnsaker er 3
    currentPris2 -= 25
    pris2.innerHTML = currentPris2 //Dette vises også på siden, og det kommer opp en melding hvis man får rabatt
    grønnsaksrabatt.innerHTML = "Gratulerer, du har fått grønnsaksrabatt på 25 kr, siden du har valgt 3 grønnsaker!"
  }
  else {
    grønnsaksrabatt.innerHTML = "" //Hvis ikke det er 3 grønnsaker, blir prisen ikke endret, og det kommer ikke opp noen melding (tom streng)
    pris2.innerHTML = currentPris2
  }
}
//////////////////////////////////////////
