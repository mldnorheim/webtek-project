//go back to order page on button click
const addMoreButton = document.getElementById("add")
addMoreButton.addEventListener("click", () => {location.href = "order.html"})

//go to payment on button click
const paymentButton = document.getElementById("pay")
paymentButton.addEventListener("click", () => {
    //Vil finne ut om er noen randome pizzaer
    let rand_text = "" //For om vi får tilfeldige pizzaer så legger inn teksten her
    if(rand_pizza !== 0) { //har en variabel som er større enn null når er random pizz
        let pizzaer = JSON.parse(localStorage.getItem("pizzaer"))
        pizzaer = pizzaer.filter(pizza => pizza[0].navn === "Random pizza")
        pizzaer.forEach(pizza => {
            rand_text += "Ingrediensene på din tilfeldige pizza er:\n"
            pizza.forEach(ingredient => {
                if(ingredient.navn != "Random pizza") {
                    rand_text += ingredient.navn + "\n"
                }
            })
            rand_text += "\n"
        })
    }
    alert("Betaling registrert. Pengene er trukket fra din konto.\n\n"+rand_text) //kommer enn pop-up med betalingsteksten
    localStorage.clear() //tar bort pizzaene som er blitt "betalt" for
    location.href = "mainpage.html" //sender bruker tilbake til mainpage
})

//will try to add row to shopping cart here
function addRow(pizza, antall, pris, radNummer) {
    //this is the div for all the content
    parent = document.querySelector(".shop_content") 

    //create the div for this pizza
    const pizzadiv = document.createElement("div")
    pizzadiv.className = "pizza"

    //this adds pizza
    const shop_pizza = document.createElement("div")
    shop_pizza.className = "shop_pizza"
    let pizzatext = document.createElement("p")
    pizzatext.appendChild(document.createTextNode(pizza))
    shop_pizza.appendChild(pizzatext)
    pizzadiv.appendChild(shop_pizza)

    //this adds number of pizzas
    const shop_antall = document.createElement("div")
    shop_antall.className = "shop_antall"
    let number = document.createElement("input")
    number.setAttribute("type", "number")
    number.min = "1"
    number.max = "9"
    number.value = antall

    //this is for summing the pizzas to know total amount to pay
    number.onchange = sum_payment
    shop_antall.appendChild(number)
    pizzadiv.appendChild(shop_antall)

    //this adds prixe of pizza
    const shop_price = document.createElement("div")
    shop_price.className = "shop_price"
    let price = document.createElement("p")
    price.appendChild(document.createTextNode(pris))
    shop_price.appendChild(price)
    pizzadiv.appendChild(shop_price)

    //this adds remove
    const shop_fjern = document.createElement("div")
    shop_fjern.className = "shop_fjern"

    //Creates remove button
    let remove = document.createElement("button")
    //to get a different id for each row and also be able to get the number easily from the id by slicing
    remove.setAttribute("id", "avbryt" + radNummer + "n") 
    remove.innerHTML = "X"

    //Makes the remove function
    remove.onclick = function() {
        //(document.getElementById(this.id).parentElement.parentElement).remove() //remove row
        let index = document.getElementById(this.id).id.slice(6,-1)
        //want to remove the entry from localStorage
        let pizzaer = JSON.parse(localStorage.getItem("pizzaer")) //get the pizzas as stored in localStorage
        pizzaer.splice(index, 1) //remove the entry for pizza in clicked-remove-button-row
        localStorage.setItem("pizzaer", JSON.stringify(pizzaer)) //set pizzaer in localstorage with new data

        //want to give new id to remove buttons so they easily match up with the data from localStorage
        //easiest way is to just remove table and load again with new data without removed row
        parent.innerHTML = "" //to remove all entries
        loadTable() //load entries again
        sum_payment() //Want the new sum
    }

    shop_fjern.appendChild(remove)
    pizzadiv.appendChild(shop_fjern)

    parent.appendChild(pizzadiv)
}


function sum_payment() { //summerer pizzaene
    let pizzas = document.querySelectorAll(".pizza")
    let total_sum = 0
    for(i = 0; i < pizzas.length; i++) { //iterer gjennom alle pizzaene og legger til i total_sum 
        let pizza_price = pizzas[i].childNodes[2].childNodes[0].innerHTML //prisen til en pizza
        let pizza_amount = pizzas[i].childNodes[1].childNodes[0].value //antallet av den pizzaen
        total_sum += pizza_price * pizza_amount //legg til prisen for disse i total prisen
    }
    sum_number.innerHTML = total_sum + " kr" //skriv summen slik at den vises på siden

}

let rand_pizza = 0; //vil inkrementeres når vi legger til en random pizza

//ADD THE PIZZAS TO THE SHOPPINGCART
function loadTable() {
    rand_pizza = 0; //nullstiller den siden vil telle hvor random pizzaer som faktisk er i shoppingcart
    const pizzaer = JSON.parse(localStorage.getItem("pizzaer"))
    if(pizzaer === null) { //sjekker først om det er noen pizzaer lagt til
        const parent = document.querySelector(".shop_content") 
        const tom = "Handlekurven din er tom"
        parent.appendChild(document.createElement("p").appendChild(document.createTextNode(tom)))
    }
    else { //hvis det er pizzaer vil vi legge dem til i handlekurven
        for(index in pizzaer) { //iterer gjennom alle pizzaene og legger dem til i handlekurven
            const pizza = pizzaer[index]
            if(pizza[0].navn === "Meny Pizza") { //sjekker først om pizzaen er en meny pizza
                addRow(pizza[1].navn, pizza[1].antall, pizza[1].pris, index)
            }
            else if(pizza[0].navn === "Selvvalgt pizza") { //sjekker så om pizzaen er selvvalgt
                addRow(pizza[0].navn, 1, pizza[0].pris, index)
            }
            else if(pizza[0].navn === "Random pizza") { //sjekker til slutt om er random pizza
                addRow(pizza[0].navn, 1, pizza[0].pris, index)
                rand_pizza += 1 //vil inkrementere denne slik at vi ikke trenger å iterer gjennom alle pizzaene senere for å finne ut om er tilfeldige pizzaer i den
            }
        }
    }
}

//disse er for at handlekurven skal lastes inn med en gang går inn på siden, heller enn å vente til folk trykker på ting
loadTable()
sum_payment()

