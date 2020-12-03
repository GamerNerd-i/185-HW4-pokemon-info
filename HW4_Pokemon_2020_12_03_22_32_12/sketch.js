const buttons = document.querySelectorAll('button')

const shinyBox = document.querySelector('#shiny')
const sprite = document.querySelector('#sprite')
const femaleSprite = document.querySelector('#femaleSprite')

const pokemonName = document.querySelector('h2')
const pokedexNumber = document.querySelector('#number')
const types = document.querySelector('#types')
const abilities = document.querySelector('#abilities')
const hiddenAbility = document.querySelector('#hiddenAbility')
const biology = document.querySelector('#biology')

let pokemon;
let shinySprite = false

for (let button of buttons) {
  button.addEventListener('click', getPokemon)
}
shinyBox.addEventListener('click', displaySprite(pokemon))

async function getPokemon(event) {
  pokemon = event.target.textContent

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
  const data = await response.json()

  pokemonName.textContent = pokemon
  pokedexNumber.textContent = `National Pokédex Number: ${data.id}`

  displayAbilities(data)
  displayTypes(data)
  displayBiology(data)
  displaySprite(pokemon)
}

function displayAbilities(data) {
  if (data.abilities.length === 1) {
    abilities.textContent = `Ability: ${data.abilities[0].ability.name.toUpperCase()}`
    hiddenAbility.textContent = ""
  }
  else {
    abilities.textContent = "Ability: "

    for (let slot of data.abilities) {
      let display = slot.ability.name.toUpperCase()

      if (slot.is_hidden) {
        hiddenAbility.textContent = `Hidden Ability: ${display}`
      }
      else {
        abilities.textContent += `${display} or `
      }
    }
  }

}

function displayTypes(data) {
  if (data.types.length > 1) {
    types.textContent = `Types: ${data.types[0].type.name.toUpperCase()} / ${data.types[1].type.name.toUpperCase()}`
  }
  else {
    types.textContent = `Type: ${data.types[0].type.name.toUpperCase()}`
  }
}

function displayBiology(data) {
  biology.textContent = `Height: ${data.height / 10} m || Weight: ${data.weight / 10} kg`
}

async function displaySprite() {
  shinySprite = shinyBox.checked

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
  const data = await response.json()

  if (shinySprite) {
    sprite.src = data.sprites.front_shiny
  }
  else {
    sprite.src = data.sprites.front_default
  }

  if (data.sprites.front_female) {
    if (shinySprite) {
      femaleSprite.src = data.sprites.front_shiny_female
    }
    else {
      femaleSprite.src = data.sprites.front_female
    }
  }
  else {
    femaleSprite.src = ""
  }
}