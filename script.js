const container = document.getElementById("pokemonGrid");
const template = document.getElementById("pokemonCardTemplate");

function clearCont() {
    container.innerHTML = "";
}

async function getPokemon(pokemon) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!res.ok) throw new Error("Not found");
    return res.json();
}

async function searchPokemon() {
    const input = document.getElementById("searchInput").value.toLowerCase();

    if(!input){
        alert("Enter a valid Gen 1 Pokemon name");
        return;
    }

    try {
        const source = await getPokemon(input);
        const pokemon = await source.json();
       
        clearCont();
        makeCard(pokemon);

    }
    
    catch (error) {
        alert("Pokemon not found.");
    }

}

document.getElementById("searchInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        
        searchPokemon();
    }
});

function makeCard(pokemon){
    const clone = template.content.cloneNode(true);

    const article = clone.querySelector(".pokemon");
    const img = clone.querySelector("img");
    const name = clone.querySelector(".pokemonName");
    const typeContainer = clone.querySelector(".pokemonType");
    const abilitiesContainer = clone.querySelector(" .pokemonAbilities");

    typeContainer.innerHTML = ''; // clear old types
    
    article.dataset.pokemonId = pokemon.id;
    img.src = pokemon.sprites.front_default;
    name.textContent = `${pokemon.name.toUpperCase()}`;
    
    pokemon.types.forEach(t => {
        const typeWrapper = document.createElement("div"); // container per type
        typeWrapper.classList.add("typeWrapper");

        const span = document.createElement("span");
        const typeName = t.type.name;

        span.textContent = typeName;
        span.classList.add("type");
        span.classList.add(typeName); 

        typeWrapper.appendChild(span);
        typeContainer.appendChild(typeWrapper);
});




    pokemon.abilities.forEach(a => {
        const span = document.createElement("span");
        span.textContent = a.ability.name;
        span.classList.add("ability");
        abilitiesContainer.appendChild(span);
    });

    container.appendChild(clone);
}

async function loadPokemon() {
    clearCont();

    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await res.json();

        const pokemonList = data.results;
        const promises = pokemonList.map(p => getPokemon(p.name));

        const gen1 = await Promise.all(promises);

        gen1.forEach(pokemon => {
            makeCard(pokemon);
        });

    } catch (error) {
        console.error(error);
    }
}

window.addEventListener("DOMContentLoaded", loadPokemon);
