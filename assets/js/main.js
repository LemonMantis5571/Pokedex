// Grab elements
const pokedex = document.getElementById("pokedex");
const pokemonContainer = document.querySelector(".pokedex");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const SearchBTN = document.querySelector(".form-btn")
const SearchInpunt = document.querySelector(".form-input");
console.log(pokedex);
console.log(previous);
console.log(next);

let limit = 8;
let offset = 1;

previous.addEventListener("click", () => {
    if (offset != 1) {
      previous.removeAttribute('href');
      previous.classList.add('active');
      offset -= 9;
      removeChildNodes(pokemonContainer);
      fetchPokemons(offset, limit);
    }
});

console.log(offset);

if (offset == 1) {
    previous.classList.add('active');
    previous.removeAttribute('href');
}

      
  
next.addEventListener("click", () => {
    previous.classList.remove('active');
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
});



async function fetchPokemon(id) {
  
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await res.json();
        const pokemon = {
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            types: data.types.map(type => type.type.name).join(', ')

        }
        MostrarPokemon(pokemon);
    
};



function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
      fetchPokemon(i);
    }
}


fetchPokemons(offset, limit);

function MostrarPokemon(pokemon){
    const card = document.createElement('li');
    card.classList.add('card');
    const cardImage = document.createElement('img');
    cardImage.classList.add('card-image');
    cardImage.src = pokemon.image;
    const cardInfo = document.createElement('h3');
    cardInfo.classList.add('Pokemon-info');
    cardInfo.innerHTML = `${pokemon.id}. ${pokemon.name.toUpperCase()}`;
    const cardDescription = document.createElement('p');
    cardDescription.classList.add('Pokemon-Description');
    cardDescription.innerHTML = `Type: ${pokemon.types}`;
    card.appendChild(cardImage);
    card.appendChild(cardInfo);
    card.appendChild(cardDescription);
    pokemonContainer.appendChild(card);
}


function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}


SearchBTN.addEventListener("click", (e) => {
  e.preventDefault();

  if(e.target.value === ' '){
    MostrarPokemon(pokemon);
  }
  
  let id = document.querySelector(".form-input").value.toLowerCase();

  
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
    console.log(data)
          const pokemon = {
              name: data.name,
              id: data.id,
              image: data.sprites['front_default'],
              types: data.types.map(type => type.type.name).join(', '),
  }
  removeChildNodes(pokemonContainer);
  MostrarPokemon(pokemon);
  });
        
});


SearchInpunt.addEventListener("keyup",(e) =>{
  e.preventDefault();

  if(e.target.value === ' '){
    MostrarPokemon(pokemon);
  }
  
  let id = document.querySelector(".form-input").value.toLowerCase();

  
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
    console.log(data)
          const pokemon = {
              name: data.name,
              id: data.id,
              image: data.sprites['front_default'],
              types: data.types.map(type => type.type.name).join(', '),
  }
  removeChildNodes(pokemonContainer);
  MostrarPokemon(pokemon);
  });

})