const $ = document
const inputSearch = $.querySelector('#search')
const form = $.querySelector('#filter > form')
const URL_base = "https://script.google.com/macros/s/AKfycbzUoD7sxrISZGa5bTJb_bo954oF6yRRk2omgqgbny9lLZ0ezQKUi_H4m5eHOYyLMKrz/exec"

function createCards(array) {
  const fragment = $.createDocumentFragment()
  array.slice(0, 20).map(item => {
    const { marca, modelo, precio, lanzamiento, imagen, idCelular } = item
    let card = $.createElement('div')
    card.id = idCelular
    card.classList.add('card')
    card.innerHTML = `
        <img src=${imagen} alt=${modelo}>
        <div class="card-body">
          <h2> ${modelo} - <strong>${marca}</strong></h2>
          <small>${lanzamiento}</small>
          <strong>$${precio}</strong>
          <button>Agregar al carrito</button>
        </div>
    `
    fragment.appendChild(card)
  })

  return fragment
}

const appendCards = (cards) => {
  const main = $.querySelector('#container-cards')
  main.innerHTML = ''
  main.append(cards)
}

const getData = (URL) => {
  fetch(URL)
    .then(res => res.json())
    .then(data => createCards(data.datos))
    .then(cards => {
      appendCards(cards)
      $.querySelector('#container-loader').style.display = 'none'
      $.querySelector('#container-cards').style.display = 'grid'
    })
    .catch(err => alert(err))
}

getData(URL_base)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  $.querySelector('#container-loader').style.display = 'flex'
  $.querySelector('#container-cards').style.display = 'none'

  if (inputSearch.value != '') {
    let key = inputSearch.value.charAt(0).toUpperCase() + inputSearch.value.slice(1)
    getData(`${URL_base}?columnaFiltro=marca&criterioFiltro=${key}`)
  } else {
    getData(URL_base)
  }

})

