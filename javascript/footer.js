
document.addEventListener("DOMContentLoaded", make_footer)

function make_footer() {
  const footer = document.querySelector('footer')
  footer.innerHTML = "<div id=footer_top class=footer_tekst> <p>Kontakt:</p> </div>"
  +"<div id=footer_bottom class=footer_tekst> <p> dumbledough@pizzawizard.com <br> tlf.: 123 45 678 </p> </div>"
}
