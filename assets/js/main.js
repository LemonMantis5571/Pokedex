// Grab elements
const pokedex = document.getElementById("pokedex");
console.log(pokedex);


const promises = [];
const fetchPokemon = ()  => {
    for (let i = 1 ; i < 10 ; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(response => response.json()));
    }

        Promise.all(promises).then(results => { 
            const pokemon = results.map(data => ({
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                types: data.types.map(type => type.type.name).join(', ')
            }));
            MostrarPokemon(pokemon);
        });
        
};

const MostrarPokemon = (pokemon) => {
    console.log(pokemon);
    const PokemonHTMLString = pokemon.map(digimon => `
    <li class="card">
    <img class="card-image" src="${digimon.image}"/>
    <h3 class="Pokemon-info">${digimon.id}. ${digimon.name.toUpperCase()}</h3>
    <p class="Pokemon-Description">Type: ${digimon.types}</p>
    </li>`).join('');
    pokedex.innerHTML = PokemonHTMLString;
}

fetchPokemon();
